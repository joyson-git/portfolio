document.addEventListener("DOMContentLoaded", () => {
    const researchTable = document.querySelector(".main"); // Target the tbody with class "main"

    const skillsData = [{
            category: "Frontend Development",
            skills: [
                { name: "HTML" },
                { name: "CSS" },
                { name: "JavaScript" },
                { name: "Bootstrap" },
                { name: "Material UI" }
            ]
        },
        {
            category: "Backend Development",
            skills: [
                { name: "Java" },
                { name: "Servlet" },
                { name: "PostgreSQL" },
                { name: "C/C++" },
                { name: "JSP" },
                { name: "MYSQL" },
                { name: "MONGODB" },
                { name: "Springboot" },
                { name: "Tomcat" },
                { name: "Eclipse" },
                { name: "Postman" },
                { name: "Git" },
                { name: "Code::Blocks" },
                { name: "Android Studio" },
                { name: "IntelliJ" },
                { name: "WebSocket API" }
            ]
        }
    ];

    const fillData = () => {
        let output = "";
        skillsData.forEach(({ category, skills }) => {
            output += `
                <tr>
                    <td colspan="2">
                        <div class="skills-category">
                            <h3>${category}</h3>
                        </div>
                    </td>
                </tr>`;
            skills.forEach(skill => {
                output += `
                <tr>
                    <td class="skill-name"><i class="fas fa-check-circle"></i> ${skill.name}</td>
                </tr>`;
            });
        });
        researchTable.innerHTML = output;
    };

    fillData(); // Call fillData function once DOM is fully loaded and researchTable is defined.
});