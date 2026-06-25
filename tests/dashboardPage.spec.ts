import {test, expect} from '../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle, dashBoardCard } from '../src/test-data'

test.describe('dashboard tests', () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto('/');
        await dashboardPage.waitFor()
        await dashboardPage.page.waitForLoadState('domcontentloaded')
    }); 
    
    test('verify dashboard cards', async({ dashboardPage }) =>{
        await dashboardPage.navigateThroughSideBar(sideNavigation.dashboard)
        await dashboardPage.verifyHeader(headerTitle.dashBoard)
    })

    test('verify 7 cards in dash board page', async({ dashboardPage }) => {
        await expect(dashboardPage.dashboardCard(dashBoardCard.timeAtWork)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.buzzLatestPosts)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.employeeDistributionBySubUnit)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.employeesOnLeaveToday)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.myActions)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.quickLaunch)).toBeVisible();
        await expect(dashboardPage.dashboardCard(dashBoardCard.employeeDistributionByLocation)).toBeVisible();

    })
}) 