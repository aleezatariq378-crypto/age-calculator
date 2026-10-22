
const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

// Today's date in local time
const today = new Date();

const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

// Do not allow future dates
dobInput.max = todayString;

calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {
    error.textContent = "";
    result.hidden = true;

    if (dobInput.value === "") {
        error.textContent = "Please enter your date of birth!";
        return;
    }

    // Read the date without timezone conversion
    const [birthYear, birthMonth, birthDay] =
        dobInput.value.split("-").map(Number);

    const birthDate = new Date(
        birthYear,
        birthMonth - 1,
        birthDay
    );

    // Validate the entered date
    if (
        birthDate.getFullYear() !== birthYear ||
        birthDate.getMonth() !== birthMonth - 1 ||
        birthDate.getDate() !== birthDay
    ) {
        error.textContent = "Please enter a valid date.";
        return;
    }

    if (birthDate > today) {
        error.textContent = "Date of birth cannot be in the future!";
        return;
    }

    let years = today.getFullYear() - birthYear;
    let months = today.getMonth() + 1 - birthMonth;
    let days = today.getDate() - birthDay;

    // Borrow days from the previous month if needed
    if (days < 0) {
        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        days += previousMonthDays;
        months--;
    }

    // Borrow months from the previous year if needed
    if (months < 0) {
        months += 12;
        years--;
    }

    // Display the calculated age
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;

    document.getElementById("birthdayMessage").textContent =
        "Your age has been calculated successfully! 🎉";

    result.hidden = false;
}
