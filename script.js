// script.js

document.addEventListener("DOMContentLoaded", function () {
    createForm();
});

function createForm() {
    var formContainer = document.body.appendChild(document.createElement("form"));
    formContainer.id = "anketForm";
    formContainer.classList.add(config.theme);

    var progressContainer = formContainer.appendChild(document.createElement("div"));
    progressContainer.classList.add("progress-container");

    var progressBar = progressContainer.appendChild(document.createElement("div"));
    progressBar.classList.add("progress-bar");

    var currentStep = 0;
    createFormStep(config.stages[currentStep], formContainer, currentStep);

    // Gönder düğmesi
    var submitButton = formContainer.appendChild(document.createElement("button"));
    submitButton.type = "button";
    submitButton.textContent = config.submitButtonText;
    submitButton.classList.add("submit-button");
    submitButton.addEventListener("click", function () {
        submitForm();
    });
}

function createFormStep(stage, formContainer, currentStep) {
    var formStep = formContainer.appendChild(document.createElement("div"));
    formStep.classList.add("form-step");

    // Başlık
    var formTitle = formStep.appendChild(document.createElement("h1"));
    formTitle.textContent = stage.title;

    // Açıklama
    var formDescription = formStep.appendChild(document.createElement("h5"));
    formDescription.textContent = stage.description;

    // Form alanları oluştur
    stage.fields.forEach(function (field) {
        if (field.type === "file") {
            createFileInput(field, formStep);
        } else {
            createInput(field, formStep);
        }
    });

    // İlerleme kontrolü
    if (currentStep > 0) {
        var prevButton = formStep.appendChild(document.createElement("button"));
        prevButton.type = "button";
        prevButton.innerHTML = "&lt; Önceki";
        prevButton.classList.add("prev-button");
        prevButton.addEventListener("click", function () {
            formContainer.innerHTML = "";
            createFormStep(config.stages[currentStep - 1], formContainer, currentStep - 1);
        });
    }

    if (currentStep < config.stages.length - 1) {
        var nextButton = formStep.appendChild(document.createElement("button"));
        nextButton.type = "button";
        nextButton.innerHTML = "Sonraki &gt;";
        nextButton.classList.add("next-button");
        nextButton.addEventListener("click", function () {
            formContainer.innerHTML = "";
            createFormStep(config.stages[currentStep + 1], formContainer, currentStep + 1);
        });
    }

    // "Anketi Gönder" düğmesini son adımda göster
    if (currentStep === config.stages.length - 1) {
        var submitButton = formStep.appendChild(document.createElement("button"));
        submitButton.type = "button";
        submitButton.textContent = config.submitButtonText;
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", function () {
            submitForm();
        });
    }
}

// Diğer kodlar aynı kalsın...

// script.js

// ...

function createInput(field, formStep) {
    var label = formStep.appendChild(document.createElement("label"));
    label.textContent = field.label;

    if (field.type === "select") {
        var select = formStep.appendChild(document.createElement("select"));
        select.id = field.id;
        select.name = field.id;
        select.required = field.required;

        field.options.forEach(function (optionText) {
            var option = select.appendChild(document.createElement("option"));
            option.value = optionText.toLowerCase();
            option.textContent = optionText;
        });
    } else if (field.type === "radio" || field.type === "checkbox") {
        var checkboxContainer = formStep.appendChild(document.createElement("div"));
        checkboxContainer.classList.add("checkbox-container");

        field.options.forEach(function (optionText) {
            var input = checkboxContainer.appendChild(document.createElement("input"));
            input.id = field.id + optionText;
            input.name = field.id;
            input.type = field.type;
            input.value = optionText.toLowerCase();
            input.required = field.required;

            var optionLabel = checkboxContainer.appendChild(document.createElement("label"));
            optionLabel.textContent = optionText;
            optionLabel.setAttribute("for", input.id);
        });
    } else {
        var input = formStep.appendChild(document.createElement("input"));
        input.id = field.id;
        input.name = field.id;
        input.type = field.type;
        input.required = field.required;
    }
}

// ...

// Diğer kodlar aynı kalsın...

function createFileInput(field, formStep) {
    var label = formStep.appendChild(document.createElement("label"));
    label.textContent = field.label;

    var input = formStep.appendChild(document.createElement("input"));
    input.id = field.id;
    input.name = field.id;
    input.type = field.type;
    input.accept = "image/*";
    input.required = field.required;
}

function createSubmitButton(formContainer) {
    var submitButton = formContainer.appendChild(document.createElement("button"));
    submitButton.type = "button";
    submitButton.textContent = config.submitButtonText;
    submitButton.addEventListener("click", function () {
        submitForm();
    });
}

function submitForm() {
    var formData = new FormData();

    config.stages.forEach(function (stage) {
        stage.fields.forEach(function (field) {
            var input = document.getElementById(field.id);

            if (input) { // input elemanı bulunuyorsa
                if (field.type === "checkbox") {
                    var checkboxes = document.querySelectorAll("input[name='" + field.id + "']:checked");
                    checkboxes.forEach(function (checkbox) {
                        formData.append(field.id, checkbox.value);
                    });
                } else if (field.type === "file") {
                    formData.append(field.id, input.files[0]);
                } else {
                    formData.append(field.id, input.value);
                }
            }
        });
    });

    // Sunucuya verileri gönderme işlemi (AJAX kullanarak)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/submitForm");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Sunucu tarafına veri gönderildi.");
        } else {
            console.error("Sunucu tarafına veri gönderme başarısız.");
        }
    };
    xhr.send(formData);
}
function updateProgressBar(percentage) {
    var progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = percentage + "%";
}
