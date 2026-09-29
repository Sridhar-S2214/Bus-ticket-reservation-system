function searchBus() {

    const selects = document.querySelectorAll("select");

    const from = selects[0].value;
    const to = selects[1].value;
    const date = document.querySelector("input[type='date']").value;

    if (from === "Select Source" || to === "Select Destination" || date === "") {
        alert("Please select From, To and Journey Date.");
        return;
    }

    if (from === to) {
        alert("From and To locations cannot be the same.");
        return;
    }

    window.fromLocation = from;
    window.toLocation = to;
    window.journeyDate = date;

    const busResults = document.getElementById("busResults");

    busResults.innerHTML = `
        <h2>Available Buses</h2>

        <div class="bus-card">

            <h3>🚌 TNSTC Express</h3>

            <p><strong>${from}</strong> → <strong>${to}</strong></p>

            <p>Departure: 08:00 AM</p>
            <p>Arrival: 02:30 PM</p>
            <p>Fare: ₹450</p>

            <button onclick="selectBus('TNSTC Express', 450)">
                Select Bus
            </button>

        </div>

        <div class="bus-card">

            <h3>🚌 Super Fast Express</h3>

            <p><strong>${from}</strong> → <strong>${to}</strong></p>

            <p>Departure: 10:30 AM</p>
            <p>Arrival: 05:00 PM</p>
            <p>Fare: ₹550</p>

            <button onclick="selectBus('Super Fast Express', 550)">
                Select Bus
            </button>

        </div>
    `;
}


function selectBus(busName, fare) {

    window.selectedBusName = busName;
    window.ticketFare = fare;

    const busResults = document.getElementById("busResults");

    busResults.innerHTML = `
        <h2>Seat Selection</h2>

        <div class="bus-card">

            <h3>🚌 ${busName}</h3>

            <p>Fare per seat: ₹${fare}</p>

            <h3>Select Your Seats</h3>

            <div class="seat-container">

                <button class="seat" onclick="selectSeat(this)">1</button>
                <button class="seat" onclick="selectSeat(this)">2</button>

                <button class="seat" onclick="selectSeat(this)">3</button>
                <button class="seat" onclick="selectSeat(this)">4</button>

                <button class="seat" onclick="selectSeat(this)">5</button>
                <button class="seat" onclick="selectSeat(this)">6</button>

                <button class="seat" onclick="selectSeat(this)">7</button>
                <button class="seat" onclick="selectSeat(this)">8</button>

                <button class="seat" onclick="selectSeat(this)">9</button>
                <button class="seat" onclick="selectSeat(this)">10</button>

                <button class="seat" onclick="selectSeat(this)">11</button>
                <button class="seat" onclick="selectSeat(this)">12</button>

            </div>

            <p>
                Selected Seats:
                <span id="seat-count">0</span>
            </p>

            <p>
                Total Fare:
                ₹<span id="total-fare">0</span>
            </p>

            <button onclick="confirmBooking()">
                Confirm Booking
            </button>

        </div>
    `;
}


function selectSeat(button) {

    button.classList.toggle("selected");

    calculateFare();
}


function calculateFare() {

    const selectedSeats =
        document.querySelectorAll(".seat.selected");

    const total =
        selectedSeats.length * window.ticketFare;

    document.getElementById("seat-count").innerText =
        selectedSeats.length;

    document.getElementById("total-fare").innerText =
        total;
}


function confirmBooking() {

    const selectedSeats =
        document.querySelectorAll(".seat.selected");

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;
    }

    const seatNumbers =
        Array.from(selectedSeats)
            .map(function(seat) {
                return seat.innerText;
            })
            .join(", ");

    window.selectedSeatNumbers = seatNumbers;

    window.totalFare =
        selectedSeats.length * window.ticketFare;

    const busResults =
        document.getElementById("busResults");

    busResults.innerHTML = `
        <h2>Passenger Details</h2>

        <div class="bus-card">

            <h3>👤 Enter Passenger Details</h3>

            <p>
                <strong>Selected Seats:</strong>
                ${window.selectedSeatNumbers}
            </p>

            <p>
                <strong>Total Fare:</strong>
                ₹${window.totalFare}
            </p>

            <label>Passenger Name:</label>

            <input
                type="text"
                id="passenger-name"
                placeholder="Enter your name"
            >

            <br><br>

            <label>Mobile Number:</label>

            <input
                type="tel"
                id="passenger-mobile"
                placeholder="Enter mobile number"
            >

            <br><br>

            <label>Email:</label>

            <input
                type="email"
                id="passenger-email"
                placeholder="Enter email"
            >

            <br><br>

            <label>Age:</label>

            <input
                type="number"
                id="passenger-age"
                placeholder="Enter age"
            >

            <br><br>

            <label>Gender:</label>

            <select id="passenger-gender">

                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>

            </select>

            <br><br>

            <button onclick="continueToPayment()">
                Continue to Payment
            </button>

        </div>
    `;
}


function continueToPayment() {

    const name =
        document.getElementById("passenger-name").value;

    const mobile =
        document.getElementById("passenger-mobile").value;

    const email =
        document.getElementById("passenger-email").value;

    const age =
        document.getElementById("passenger-age").value;

    const gender =
        document.getElementById("passenger-gender").value;

    if (
        name === "" ||
        mobile === "" ||
        email === "" ||
        age === "" ||
        gender === "Select Gender"
    ) {

        alert("Please fill all passenger details.");

        return;
    }

    window.passengerName = name;
    window.passengerMobile = mobile;
    window.passengerEmail = email;
    window.passengerAge = age;
    window.passengerGender = gender;

    const busResults =
        document.getElementById("busResults");

    busResults.innerHTML = `
        <h2>Payment</h2>

        <div class="bus-card">

            <h3>💳 Payment Details</h3>

            <p>
                <strong>Passenger:</strong>
                ${window.passengerName}
            </p>

            <p>
                <strong>Selected Seats:</strong>
                ${window.selectedSeatNumbers}
            </p>

            <p>
                <strong>Amount to Pay:</strong>
                ₹${window.totalFare}
            </p>

            <label>Payment Method:</label>

            <select id="payment-method">

                <option>Select Payment Method</option>
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>

            </select>

            <br><br>

            <button onclick="makePayment()">
                Pay ₹${window.totalFare}
            </button>

        </div>
    `;
}


function makePayment() {

    const paymentMethod =
        document.getElementById("payment-method").value;

    if (paymentMethod === "Select Payment Method") {

        alert("Please select a payment method.");

        return;
    }

    window.paymentMethod = paymentMethod;

    alert("Payment successful!");

    showTicket();
}


function showTicket() {

    const busResults =
        document.getElementById("busResults");

    const bookingId =
        "BT" + Math.floor(100000 + Math.random() * 900000);

    busResults.innerHTML = `
        <h2>🎫 Booking Confirmed</h2>

        <div class="bus-card">

            <h3>🚌 Bus Ticket</h3>

            <hr>

            <p>
                <strong>Booking ID:</strong>
                ${bookingId}
            </p>

            <p>
                <strong>Passenger:</strong>
                ${window.passengerName}
            </p>

            <p>
                <strong>Mobile:</strong>
                ${window.passengerMobile}
            </p>

            <p>
                <strong>Bus:</strong>
                ${window.selectedBusName}
            </p>

            <p>
                <strong>Route:</strong>
                ${window.fromLocation} → ${window.toLocation}
            </p>

            <p>
                <strong>Journey Date:</strong>
                ${window.journeyDate}
            </p>

            <p>
                <strong>Seats:</strong>
                ${window.selectedSeatNumbers}
            </p>

            <p>
                <strong>Total Fare:</strong>
                ₹${window.totalFare}
            </p>

            <p>
                <strong>Payment Method:</strong>
                ${window.paymentMethod}
            </p>

            <p>
                <strong>Payment Status:</strong>

                <span style="color: green;">
                    ✅ Payment Successful
                </span>

            </p>

            <hr>

            <h3>🎉 Thank you for booking!</h3>

            <button onclick="window.print()">
                🖨️ Print Ticket
            </button>

        </div>
    `;
}
