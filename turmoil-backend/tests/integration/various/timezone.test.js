describe('Timezones', () => {
  it('should always be Central European Standard Time', () => {
    expect(new Date().getTimezoneOffset()).toBe(-60);
  });
});
