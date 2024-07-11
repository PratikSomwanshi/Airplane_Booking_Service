const { API_KEY, WEBHOOK_KEY } = require("../config/serverConfig");
const Booking = require("../model/Booking");
const stripeWebhookSecret = WEBHOOK_KEY;
const stripe = require("stripe")(API_KEY);

const Flight = require("../model/Flight");
const Seat = require("../model/Seat");
const User = require("../model/User");

async function createStripeCustomer(email, name, address) {
    try {
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            address: address,
        });
        return customer;
    } catch (error) {
        console.error("Error creating Stripe customer:", error);
        throw error;
    }
}
// flightNumber, amount
async function paymentCheckout(data) {
    const { flightNumber, seatNumber, customerEmail } = data;

    console.log(data);
    const flight = await Flight.findOne({ flightNumber });

    try {
        if (!flightNumber) {
            throw Error("flight number not present");
        }
        // console.log(data);
        const user = await User.findOne({ email: customerEmail });

        if (!user) {
            throw Error("Payment can not be done, User not found");
        }

        if (!flight) {
            throw new Error("Flight not found");
        }

        if (flight.availableSeats === 0) {
            throw new Error("No seats available on this flight");
        }

        const seat = await Seat.findOneAndUpdate(
            { seatNumber, flight: flight._id, isBooked: false },
            { isBooked: true },
            { new: true }
        );

        if (!seat) {
            if (await Seat.findOne({ seatNumber, flight: flight._id })) {
                throw Error(`${seatNumber} Seat is already booked`);
            } else {
                throw Error("Invalid seat provided");
            }
        }

        const address = {
            line1: user.address.line1,
            city: user.address.city,
            state: user.address.state,
            postal_code: user.address.postalCode,
            country: user.address.country,
        };

        let customer = await createStripeCustomer(
            customerEmail,
            user.fullName,
            address
        );

        const sessionTimeout = 30 * 60;

        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: flight.flightNumber,
                        },
                        unit_amount: flight.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            expires_at: Math.floor(Date.now() / 1000) + sessionTimeout,
            metadata: {
                flight_id: JSON.stringify(flight._id),
                email: user.email,
                seatNumber,
            },
        });

        return session;
    } catch (error) {
        throw error;
    }
}

async function stripeWebhook(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            stripeWebhookSecret
        );
    } catch (err) {
        console.log(err);
        throw Error(err);
    }

    console.log("event: " + event);

    let session = event.data.object;

    switch (event.type) {
        case "checkout.session.completed":
            const { flight_id, email, seatNumber } = session.metadata;
            console.log("payment success " + flight_id + email + seatNumber);
            const booking = new Booking({
                userEmail: email,
                flight: flight_id,
                seatNumber,
            });

            await booking.save();

            const flight = await Flight.findById(JSON.parse(flight_id));

            flight.seatsAvailable--;
            await flight.save();

            break;
        case "checkout.session.expired":
            console.log("session expired");
        case "checkout.session.async_payment_failed":
            await Seat.findOneAndUpdate(
                { seatNumber, flight: flight_id, isBooked: true },
                { isBooked: false },
                { new: true }
            );
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    // response.send();
    return true;
}

const handlePaymentCompletion = async (session) => {
    const { userEmail, details } = session.metadata;

    try {
        await Payment.findOneAndUpdate(
            { stripeSessionId: session.id },
            { status: "complete" }
        );

        // const booking = new Booking({
        //     userEmail: userEmail,
        //     details: details,
        // });

        // await booking.save();
        console.log("Booking successful:");
        return "Booking successful:";
    } catch (error) {
        console.error("Error completing booking:", error.message);
    }
};

const handlePaymentFailure = async (session) => {
    try {
        // await Payment.findOneAndUpdate(
        //     { stripeSessionId: session.id },
        //     { status: "failed" }
        // );

        console.log("Payment failed for session:", session.id);
    } catch (error) {
        console.error("Error handling failed payment:", error.message);
    }
};

module.exports = {
    paymentCheckout,
    stripeWebhook,
};
