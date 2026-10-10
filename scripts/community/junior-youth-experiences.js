(() => {
  const experiences = document.querySelectorAll(".jy-experience");

  // Always begin with every experience collapsed.
  // This also prevents restored browser state from reopening
  // multiple <details> elements after refresh/back navigation.
  experiences.forEach((experience) => {
    const details = experience.querySelector(".jy-experience-details");

    if (details) {
      details.open = false;
    }

    experience.classList.remove("has-open-details");
    experience.style.removeProperty("--jy-details-height");
  });

  function updateExperience(experience) {
    const details = experience.querySelector(".jy-experience-details");
    const body = details?.querySelector(".jy-experience-details-body");

    if (!details || !body || !details.open) {
      experience.classList.remove("has-open-details");
      experience.style.removeProperty("--jy-details-height");
      return;
    }

    experience.classList.add("has-open-details");

    requestAnimationFrame(() => {
      experience.style.setProperty(
        "--jy-details-height",
        `${body.offsetHeight}px`
      );
    });
  }

  experiences.forEach((experience) => {
    const details = experience.querySelector(".jy-experience-details");

    if (!details) return;

    details.addEventListener("toggle", () => {
      if (details.open) {
        experiences.forEach((otherExperience) => {
          if (otherExperience === experience) return;

          const otherDetails = otherExperience.querySelector(
            ".jy-experience-details"
          );

          if (otherDetails?.open) {
            otherDetails.open = false;
          }
        });
      }

      updateExperience(experience);
    });

    updateExperience(experience);
  });

  window.addEventListener("resize", () => {
    experiences.forEach(updateExperience);
  });
})();
