import CreateProjects from "./app/scripts/createProjects.js";

gsap.registerPlugin(Flip, ScrollTrigger);

class App {
  constructor() {
    this._createLenis();
    this._render();

    this.imagesWrapper = document.querySelector(".intro__images");

    // this.images = [...this.imagesWrapper.querySelectorAll("img")];
    // Declaring Variables
    this.state = null;
    this.introSection = document.querySelector(".intro");
    this.navImages = document.querySelectorAll("#nav img");
    this.titleLines = 'h1 [data-animation="text-reveal"] > *';
    this.subTitleLine = 'h3 [data-animation="text-reveal"] > *';
    this.images = [...this.imagesWrapper.querySelectorAll("img")];

    this._loadInitialState();
    this._createPareallexImages();
    this._getFinalState();
    this._setInitialState();
    this._fadeUpImages();
    this._createPinnedSection();

    // Project section
    this.projectSection = document.querySelector(".projects_section");

    this._createProjects();

    // this._importProjects();
    // this._createProjectSectionTag();
    // this._createEvents();

    // this._createHomeIntro();
    // this._createProjects();
  }

  // first, create lenis then redner lenis
  _createLenis() {
    console.log("Create lenis was ran");
    this.lenis = new Lenis({
      lerp: 0.07,
    });
  }

  // - - - - - - - - - //
  //  Home intro animation  //
  // - - - - - - - - - //
  _loadInitialState() {
    console.log("Load initial state was ran");
    // nav images are hidden
    this.navImages.forEach((navImg) => {
      gsap.set(navImg, {
        y: 100,
      });
    });

    // The fullwidth image is also scaled bigger at first so that...
    gsap.set(".fullwidth-image img", {
      scale: 1.08,
    });

    gsap.set(".fullwidth-image__text", {
      y: 70,
      opacity: 0,
    });

    // animate textline
    gsap.set(this.dividerLine, {
      scaleX: 0,
      opacity: 1,
    });
  }

  _createPareallexImages() {
    console.log("Create Parallex Images was ran");
    // you have to pass in scrollTrigger object into the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.introSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.2,
      },
    });

    this.images.forEach((image) => {
      tl.to(
        image,
        {
          ease: "none",
          yPercent: gsap.utils.random(-100, -50),
        },
        "<"
      );
    });
  }

  _getFinalState() {
    console.log("Get Final State was ran");
    // to set images to the initial postitions they will aimate
    this.imagesWrapper.classList.remove("initial");

    // moving images to center
    gsap.set([this.images], {
      xPercent: 0,
      yPercent: 0,
    });

    // Gsap State to record stuff to animate from
    this.state = Flip.getState([this.images]);
  }

  _setInitialState() {
    console.log("Set Initail State was ran");
    // to set images to the initial postitions they will aimate
    this.imagesWrapper.classList.add("initial");

    // changing transform origins of the images to top left
    gsap.set(this.images, {
      xPercent: -50,
      yPercent: -50,
    });
  }

  _fadeUpImages() {
    console.log("Fade up images was ran");
    // without onComplete callback, both animations will start at once
    return gsap.to([this.images], {
      opacity: 1,
      duration: 0.6,
      ease: "expos.inout",
      stagger: 0.1,
      onComplete: () => this._animateImages(),
    });
  }

  _animateImages() {
    console.log("Animate images was ran");
    // animating with Flip
    Flip.to(this.state, {
      duration: 1.5,
      ease: "expo.inOut",
      stagger: 0.15,
      onComplete: () => this._revealContent(),
    });
  }

  _revealContent() {
    console.log("Reveal content was ran");
    if (this.imagesWrapper) {
      const tl = gsap.timeline({
        defaults: {
          y: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
      });

      tl.to(this.titleLines, {
        stagger: 0.2,
      }).to(
        this.subTitleLine,
        {
          ease: "expo.inOut",
          onComplete: () => this._revealNav(),
        },
        "<+0.4"
      );

      return tl;
    }
  }

  _revealNav() {
    console.log("Reveal Nav was ran");
    if (this.imagesWrapper) {
      this.navImages.forEach((navImg) => {
        gsap.to(navImg, {
          y: 0,
          ease: "expos.inout",
          duration: 1,
          stagger: 0.8,
        });
      });
    }
  }

  // Pinned section animation
  _createPinnedSection() {
    console.log("Create Pinned Section was ran");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        stat: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
        ease: "expo.out",
      },
    });

    tl.to(".fullwidth-image__overlay", {
      opacity: 0.6,
    })
      .to(
        ".fullwidth-image",
        {
          // you need percentages in clip-path values
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        0
      )
      .to(
        ".fullwidth-image img",
        {
          scale: 1,
        },
        0
      )
      .to(
        ".fullwidth-image__text",
        {
          opacity: 1,
          y: 0,
        },
        "<+=0.1"
      );
  }

  // - - - - - - - - - //
  //  Project section  //
  // - - - - - - - - - //

  _createProjects() {
    this.createProjects = new CreateProjects();
  }

  // Start Lenis after the document is fully loaded
  _onDocumentLoaded() {
    console.log("On Document Load was ran");
    this.lenis.start();
  }

  // after creating lenis, animate scroll
  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }
}

// Initialize App after the document is fully loaded
window.addEventListener("load", () => {
  console.log("Window was loaded was ran");
  const app = new App();
  app._onDocumentLoaded(); // Start Lenis animation after the document is fully loaded
});
