AOS.init();
/* Project Cards */

const projectcards = document.querySelector(".projectcards");

// Array of object for projects
const projects = [

    {
        title: "AI-chat-Bot",
        cardImage: "assets/images/project-page/AI.png",
        description: "A chess engine for a popular game dev engine.",
        tagimg: "https://image.flaticon.com/icons/png/512/643/643350.png",
        Previewlink: "https://youtu.be/ksHlqsVF_wE?si=wa_r9PmvM-y_K7Z8",
        Githublink: "https://youtu.be/ksHlqsVF_wE?si=wa_r9PmvM-y_K7Z8",
    },

    {
        title: "Leucine-Hackathon",
        cardImage: "assets/images/project-page/hackerthon.png",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://youtu.be/5Xojp0oC91I",
        Githublink: "https://github.com/joyson-git/Leucine-Hackathon",
    },



    {
        title: "live-streaming",
        cardImage: "assets/images/project-page/live.png",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://youtu.be/WjjSzr2tEoo",
        Githublink: "https://github.com/joyson-git/live-streaming",
    },
    
    {
        title: "Student Result Management System",
        cardImage: "assets/images/project-page/student.jpeg",
        description: "Implemented a robust  System, utilizing Java for backend, Eclipse for development, and Tomcat for server deployment. ",
        tagimg: "https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png",
        Previewlink: "https://youtu.be/wSy-msDkrsA?si=DLuHkbN2oE_M0tDX",
        Githublink: "https://github.com/joyson-git/StudentResult",
    },
    {
        title: "Blood Bank Management System",
        cardImage: "assets/images/project-page/blood.png",
        description: "A chess engine for a popular game dev engine.",
        tagimg: "https://image.flaticon.com/icons/png/512/643/643350.png",
        Previewlink: "https://youtu.be/jwPxnzH9WaI?si=LTDgZ8dJnViZbpV3",
        Githublink: "https://github.com/joyson-git/bloodbank",
    },
    {
        title: "ChatConnect-message",
        cardImage: "assets/images/project-page/chat.webp",
        description: "Flappy bird game built using React.js",
        tagimg: "https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png",
        Previewlink: "https://youtu.be/lV2iEJMYCkc",
        Githublink: "https://github.com/joyson-git/chatMessage",
    },
    {
        title: "BookHaven",
        cardImage: "assets/images/project-page/libaray.webp",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://youtu.be/ku1DLGw_2iU",
        Githublink: "https://github.com/joyson-git/Book-store",
    },

    {
        title: "Cab-booking-cheap price and long distance range",
        cardImage: "assets/images/project-page/cars.png",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://github.com/joyson-git/cab-driver",
        Githublink: "https://github.com/joyson-git/cab-driver",
    },


    

    {
        title: "Super-Market-Billing-System-With-File-Handling-C++",
        cardImage: "assets/images/project-page/super.png",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://github.com/joyson-git/Super-Market-Billing-System-With-File-Handling-C-",
        Githublink: "https://github.com/joyson-git/Super-Market-Billing-System-With-File-Handling-C-",
    },

    {
        title: "Ecommer-springboot",
        cardImage: "assets/images/project-page/ecommer.png",
        description: "Exercise tracker built using basic redux.",
        tagimg: "https://miro.medium.com/max/2800/0*U2DmhXYumRyXH6X1.png",
        Previewlink: "https://github.com/joyson-git/Ecommer-springboot",
        Githublink: "https://github.com/joyson-git/Ecommer-springboot",
    },


];

// function for rendering project cards data
const showCards = () => {
    let output = "";
    projects.forEach(({ title, cardImage, Previewlink, Githublink }) => {
        output += `       
        <div class="column skill-card card" style="margin: 15px"data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="300" data-aos-duration="600" >
          <div class="wrapper" style="background: url(${cardImage}) center / cover no-repeat;">
            <div class="header">
            </div>
            <div class="data">
              <div class="content">
              <div class="title-div">
                <h1 class="title"><a href="#">${title}</a></h1>
                </div>
            <ul class="menu-content"><br>
                  <li><a href="${Previewlink}" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></a></li>
                  <li><a href="${Githublink}" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>`;
    });
    projectcards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

function myFunction() {
    // Declare variables
    var input, button, i, skillcard, card, title;
    input = document.getElementById("myInput").value;
    input = input.toUpperCase();
    skillcard = document.getElementsByClassName("skill-card");
    card = document.getElementsByClassName("card");
    title = document.getElementsByClassName("title");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < button.length; i++) {
        if (
            button[i].innerHTML.toUpperCase().includes(input) ||
            title[i].innerHTML.toUpperCase().includes(input)
        ) {
            skillcard[i].style.display = "";
            card[i].style.display = "";
        } else {
            skillcard[i].style.display = "none";
            card[i].style.display = "none";
        }
    }
}