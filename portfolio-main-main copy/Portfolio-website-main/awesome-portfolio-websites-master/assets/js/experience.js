AOS.init();

//  Work experience cards

const experiencecards = document.querySelector(".experience-cards");
const exp = [{
    title: "Software Development Intern",
    cardImage: "assets/images/experience-page/ek.jpeg",
    place: "Ekathva Innovations",
    desp: "Implemented a robust Student Result Management System, utilizing Java for backend, Eclipse for development, and Tomcat for server deployment.Designed and developed the frontend with Bootstrap, CSS, and HTML, ensuring a responsive and user-friendly interface.Demonstrated exceptional communication skills,effectively collaborating with team members and stakeholders",


}, ];

const showCards2 = () => {
    let output = "";
    exp.forEach(
        ({ title, cardImage, place, time, desp }) =>
        (output += `        
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400"> 
      <div class="card card1">
        <img src="${cardImage}" class="featured-image"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>
              ${desp}
            </ol>
          </header>
        </article>
      </div>
    </div>
      `)
    );
    experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);

// Volunteership Cards

const volunteership = document.querySelector(".volunteership");
const volunteershipcards = [{
        title: "Leetcode",
        cardImage: "assets/images/experience-page/1.jpg",
        description: "Successfully solved over 200+ LeetCode problems DSA ",
    },
    {
        title: "Coding Ninjas",
        cardImage: "assets/images/experience-page/2.jpg",
        description: "Successfully solved over 150+ problems",
    },
];

const showCards = () => {
    let output = "";
    volunteershipcards.forEach(
        ({ title, cardImage, description }) =>
        (output += `        
      <div class="card volunteerCard" data-aos="fade-down" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600" style="height: 550px;width:400px">
      
      <img src="${cardImage}" height="250" width="65" class="card-img" style="border-radius:10px">
      <div class="content">
          <h2 class="volunteerTitle">${title}</h2><br>
          <p class="copy">${description}</p></div>
      
      </div>
      `)
    );
    volunteership.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

// Hackathon Section

const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [{
        title: "Leetcode",
        subtitle: "200th",
        image: "assets/images/experience-page/uplift.png",
        desp: "Participated in numerous hackathons, bringing innovative solutions and a collaborative spirit to each challenge.",

    },
    {
        title: "Coding Ninjas",
        subtitle: "19th",
        image: "assets/images/experience-page/ulhacks.png",
        desp: "Excelled in creating innovative solutions under pressure and tight deadlines, contributing positively to team dynamics.Consistently applied my knowledge of data structures and algorithms to tackle diverse and complex problems. ",

    },
];

const showCards3 = () => {
    let output = "";
    mentor.forEach(
        ({ title, image, subtitle, desp, href }) =>
        (output += `  
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
            <img src="${image}" alt="">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
          <a href="${href}" class="blog-slider__button">Read More</a>   
        </div>
      </div>
      `)
    );
    hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);