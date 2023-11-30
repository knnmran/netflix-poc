import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import * as path from "path";
import "chromedriver";

describe("application form", () => {
  test("validate captcha error message", async () => {

    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    const JOBS_URL = "https://jobs.netflix.com/";

    const position = "Senior UI Automation Engineer";
    const firstName = "netflix";
    const lastName = "love";
    const email = "netflix_love@gmail.com";
    const phoneNumber = "571-777-7777"

    const searchInputBox = By.id('autocomplete-input');
    const positionResult = By.xpath(`//a[contains(@aria-label,"${position}")]`);
    const applyNowButton = By.xpath(`(//div[contains(text(),"APPLY NOW")])[2]`);
    const firstNameInputBox = By.id("first_name");
    const lastNameInputBox = By.id("last_name");
    const emailInputBox = By.id("email");
    const phoneNumberInputBox = By.id("phone_number");
    const resumeInput = By.id("resume");
    const uploadResumeButton = By.xpath(`//button[.="Upload Resume"]`);
    const removeButton = By.xpath(`//span[.="Remove"]`)
    const submitApplicationButton = By.xpath(`//button[@aria-label="Submit"]`);
    const captchaErrorText = By.xpath(`//p[contains(text(),'ReCaptcha')]`);

    const samplePdfPath = path.resolve("./sample.pdf");

    try {
      await driver.get(JOBS_URL);
      await driver.findElement(searchInputBox).sendKeys(position, Key.RETURN);

      await driver.wait(until.elementsLocated(positionResult), 5000);
      await driver.findElement(positionResult).click();

      await driver.wait(until.elementsLocated(applyNowButton), 5000);
      await driver.findElement(applyNowButton).click();

      await driver.findElement(firstNameInputBox).sendKeys(firstName);
      await driver.findElement(lastNameInputBox).sendKeys(lastName);
      await driver.findElement(emailInputBox).sendKeys(email);
      await driver.findElement(phoneNumberInputBox).sendKeys(phoneNumber);

      await driver.findElement(resumeInput).sendKeys(samplePdfPath);

      // await driver.wait(until.elementsLocated(uploadResumeButton), 5000);
      // await driver.findElement(uploadResumeButton).submit();
      
      await driver.wait(until.elementsLocated(removeButton), 5000);

      // adding sleep for upload demonstration purposes
      // feel free to comment out
      // await driver.sleep(1000);

      await driver.actions().keyDown(Key.DOWN).perform();
      await driver.actions().keyDown(Key.DOWN).perform();

      await driver.wait(until.elementsLocated(submitApplicationButton), 5000);
      await driver.findElement(submitApplicationButton).click();

      await driver.wait(until.elementsLocated(captchaErrorText), 5000);
      const errorMessage = await driver.findElement(captchaErrorText).getText();

      expect(errorMessage).toBe("Failed to verify ReCaptcha token - please try again.");

      // again adding sleep for demonstration
      // await driver.sleep(1000);
    } finally {
      await driver.quit();
    }

  }, 320000)
})
