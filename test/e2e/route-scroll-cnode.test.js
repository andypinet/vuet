import { Selector, ClientFunction } from 'testcafe'

fixture`route-scroll-cnode`
.page`http://localhost:3000/route-scroll-cnode/index.html`

test.only('base', async t => {
  await Selector('.list li', { visibilityCheck: true, timeout: 60000 })()
  await ClientFunction(() => {
    window.scrollTo(0, 300)
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  })()
  await t
    .click('.list li:nth-child(20) a')
    .click('.detail-back')
    .expect(await ClientFunction(() => {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    })()).eql({ x: 0, y: 300 })
    .click('header ul li:nth-child(2) a')
    .expect(await ClientFunction(() => {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    })()).eql({ x: 0, y: 0 })

  await Selector('.list li', { visibilityCheck: true, timeout: 60000 })()
  await ClientFunction(() => {
    window.scrollTo(0, 400)
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  })()
  await t
    .click('.list li:nth-child(25) a')
    .click('.detail-back')
    .expect(await ClientFunction(() => {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    })()).eql({ x: 0, y: 400 })

  await ClientFunction(() => {
    window.scrollTo(0, 450)
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  })()
  await t
    .click('.list li:nth-child(30) a')
    .click('.detail-back')
    .expect(await ClientFunction(() => {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    })()).eql({ x: 0, y: 450 })
})
