import {browser, by, element, ProtractorExpectedConditions} from "protractor";

describe('Login interface', function () {
  let username = element(by.id('usernameInput'));
  let password = element(by.id('PasswordInput'));
  let loginButton = element(by.buttonText('Se connecter'));
  let modal = element(by.css('.swal2-modal'));
  let preloader = element(by.css('.preloader-progress'));
  let until = new ProtractorExpectedConditions(browser);

  beforeEach(function () {
    browser.get('/#/login');
    browser.wait(until.invisibilityOf(preloader), 10000, 'preloader is taking too long');
  });

  function login(user, pass) {
    username.sendKeys(user);
    password.sendKeys(pass);
  }

  it('should login the user successfully', function () {
    login('admin', 'user');
    loginButton.click().then(function () {
      browser.sleep(3000);
      expect(browser.getCurrentUrl()).toMatch('/home');
    });
  });

  it('should block user from login and show error popup', function () {
    login('false', 'false');
    loginButton.click().then(function () {
      expect(browser.getCurrentUrl()).toMatch('/login');
    });
    browser.wait(until.visibilityOf(modal)).then(function () {
      expect(modal.isDisplayed()).toBeTruthy();
    })
  });

});
