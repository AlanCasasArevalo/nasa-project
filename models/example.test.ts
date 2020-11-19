import { assertEquals, assertNotEquals } from '../dependencies/deps.ts'
Deno.test('Example equals', () => {
  assertEquals('deno', 'deno')
})

Deno.test('Example Not equals', () => {
  assertNotEquals('deno', 'node')
  assertNotEquals({
    runtime: 'deno'
  }, {
    runtime: 'node'
  })
})

Deno.test({
  name: 'Example fails tests',
  ignore: true, // This value it's to ignore test
  fn() {
    assertEquals('deno', 'node')
    assertNotEquals({
      runtime: 'deno'
    }, {
      runtime: 'node'
    })
  }
})

// To run an specific test with a specifics names you can run next command
// deno test --filter leak --allow-read
Deno.test({
  name: 'Operation leak',
  sanitizeOps: true, // This parameter is to sanear las operaciones asincronas
  ignore: true, // This value it's to ignore test
  fn() {
    setTimeout(console.log, 10000)
  }
})

Deno.test({
  name: 'Resource leak',
  ignore: false,
  sanitizeOps: true,
  sanitizeResources: false,
  async fn() {
   await Deno.open('./models/planets.ts')
  }
})

