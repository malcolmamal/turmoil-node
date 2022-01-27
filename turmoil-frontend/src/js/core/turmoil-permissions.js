const Permissions = {
  enableActions() {
    window.turmoil.instance.isActive = true;
  },
  blockActions() {
    window.turmoil.instance.isActive = false;
  },
  areActionsAllowed() {
    return window.turmoil.instance.isActive;
  },
};

export default Permissions;
