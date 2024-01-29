var config = {
    theme: "light", // "light" or "dark"
    stages: [
        {
            title: "Personal Information",
            description: "Specify your name, surname, and age.",
            fields: [
                { label: "Your Name:", id: "name", type: "text", required: true },
                { label: "Your Surname:", id: "surname", type: "text", required: true },
                { label: "Your Age:", id: "age", type: "number", required: true },
            ]
        },
        {
            title: "Preferences",
            description: "Specify your favorite programming language and other preferences.",
            fields: [
                { label: "Favorite Programming Language:", id: "programmingLanguage", type: "select", options: ["JavaScript", "Python", "Java", "C#", "Ruby"], required: true },
                { label: "Favorite Technology Blog:", id: "techBlog", type: "text" },
                { label: "Best Mobile App:", id: "mobileApp", type: "text" },
                { label: "Favorite Tech Brand:", id: "techBrand", type: "text" },
                { label: "Which Devices Do You Use?", id: "devices", type: "checkbox", options: ["Smartphone", "Tablet", "Computer", "Game Console"] },
            ]
        },
        {
            title: "Contact Information",
            description: "Add your email address and profile picture.",
            fields: [
                { label: "Your Email Address:", id: "email", type: "email", required: true },
                { label: "Add Your Profile Picture:", id: "profilePhoto", type: "file" },
            ]
        }
    ],
    submitButtonText: "Submit"
};
