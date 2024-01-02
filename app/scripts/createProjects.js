import ProjectList from "../project_src/projectList.js";

export default class CreateProjects {
  constructor() {
    this.projectSection = document.querySelector(".projects_section");

    console.log("Create Projects is imported");
    this._importProjects();
    this._createProjectSectionTag();
    this._createEvents();
  }

  _importProjects() {
    console.log("Project data are acquired");
    this.projectList = new ProjectList();
  }

  _createProjectSectionTag() {
    console.log("Crate Project Section Tags was ran");
    function elementFromHtml(html) {
      const template = document.createElement("template");

      template.innerHTML = html.trim();

      return template.content.firstElementChild;
    }

    this.projectList.projects.forEach((project) => {
      const projectListTags = elementFromHtml(`
                  <div class="project__wrapper">
                      <div class="project__container">
                          <div class="project__details">
                              <div><h1>${project.name}</h1></div>
                              <h3><p>${project.detail}</p></h3>
                              <div class="divider-line"></div>
                              <p class="project-description">${project.title}</p>
                              <div class="project_cta_container">
                                <div class="project__cta-wrapper">
                                  <a href="#" class="project__cta" data-text=" Case Study">View ${project.type}
                                  <svg class="project_cta_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-arrow-up-right">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline></svg>
                                  </a>
                                  <div class="project_cta_line"></div>
                                </div>
                              </div>
                              <h2>0${project.projectId}</h2>
                              <div class="footer-line"></div>
                          </div>
                          <div class="project__image">
                              <img src="${project.coverImage}" alt="">
                          </div>
                      </div>
                  </div>
                  `);

      // Adding event listener to a tag
      const projectCTA = projectListTags.querySelector(".project__cta");
      projectCTA.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = project.pagelink;
      });

      this.projectSection.append(projectListTags);

      //   Project wrapper containers
      // const projectWrapperTags = document.querySelectorAll(".project__wrapper");
      const projectWrapperTags =
        this.projectSection.querySelectorAll(".project__wrapper");

      // Looping the parent div and animating the childrens
      projectWrapperTags.forEach((projectWrapper) => {
        const dividerLine = projectWrapper.querySelector(".divider-line");
        const footerLine = projectWrapper.querySelector(".footer-line");
        const cta_wrapper = projectWrapper.querySelector(
          ".project__cta-wrapper"
        );
        const projectCtaIcon =
          projectWrapper.querySelector(".project_cta_icon");
        const projectCta = projectWrapper.querySelector(".project__cta");
        const project_cta_line =
          projectWrapper.querySelector(".project_cta_line");
        const projectHeader = projectWrapper.querySelector(
          ".project__details h1"
        );
        const projectSubtitle = projectWrapper.querySelector("h3");
        const projectDescription = projectWrapper.querySelector(
          ".project-description"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectWrapper,
            start: "-=250",
            end: "",
            duration: 0.3,
          },
        });

        gsap.set(projectHeader, { y: 190 });
        gsap.set(dividerLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(projectCta, { y: 80 });
        gsap.set(footerLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(projectSubtitle, { opacity: 0 });
        gsap.set(projectDescription, { opacity: 0 });
        gsap.set(project_cta_line, { y: 100, opacity: 0 });

        tl.to(projectHeader, { y: 0, ease: "back.out" })
          .to(projectSubtitle, { opacity: 1 }, 0 + 0.1)
          .to(projectDescription, { opacity: 1 }, 0 + 0.1)
          .to(dividerLine, { scaleX: 1 }, 0 + 0.1)
          .to(projectCta, { y: 0, ease: "back.out(2)" }, 0 + 0.1)
          .to(footerLine, { scaleX: 1 }, 0 + 0.3);

        // project events
        cta_wrapper.addEventListener("mouseover", () => {
          const tl = gsap.timeline({ ease: "expos.out" });
          tl.to(projectCta, {
            duration: 0.05,
            color: "var(--color-violet-400)",
          }).to(
            projectCtaIcon,
            {
              yPercent: -20,
            },
            "0"
          );
          tl.play();
        });
        cta_wrapper.addEventListener("mouseleave", () => {
          const tl = gsap.timeline({ ease: "expos.out" });
          tl.to(projectCta, {
            duration: 0.03,
            color: "var(--text-color-dark)",
          }).to(
            projectCtaIcon,
            {
              yPercent: 0,
            },
            "0"
          );
          tl.play();
        });
      });

      // this.projectSection.append(projectListTags);
      // - - - - - - - - - - - - - - - - - - - - - - - -
    });
  } // end of _createProjectSection

  _createEvents() {
    // end of createEvents
  }
}
