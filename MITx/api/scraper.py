from playwright.sync_api import sync_playwright

def take_screenshot(playwright):
    browser = playwright.chromium.launch()  # Set headless=False if you want to see the browser
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://in-tendhost.co.uk/gggi/aspx/Projects/Current/")

    # Take a screenshot of the full page
    page.screenshot(path="screenshot1.png", full_page=True)

    context.close()
    browser.close()

with sync_playwright() as playwright:
    take_screenshot(playwright)
