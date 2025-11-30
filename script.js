document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");

/* Initialize EmailJS with your public key */
(function () {
  emailjs.init("jmp3vTXxF2I0Vs-lg"); // YOUR PUBLIC KEY
})();

/* Show popup function */
function showPopup(msg) {
  popup.textContent = msg;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .sendForm("service_71ol8ee", "template_ht3t1cn", form)
    .then(() => {
      showPopup("Message sent successfully!");
      form.reset();
    })
    .catch((err) => {
      console.error(err);
      showPopup("Error sending message. Check EmailJS.");
    });
});
