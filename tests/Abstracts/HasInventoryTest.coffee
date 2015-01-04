describe "HasInventory", ->
  scope = null
  entity = null;

  beforeEach module("survidle")
  beforeEach inject(($rootScope) ->
    scope = $rootScope.$new()
    entity = new Abstracts.HasInventory
  )

  describe "#add", ->
    it "Adds an item to the inventory", ->
      entity.add new Entities.Item(key: "foobar")
      expect(entity.inventory.foobar.quantity).toBe 1

  describe "#addMultipleItems", ->
    it "Adds multiple items to the inventory", ->
      entity.add new Entities.Item(key: 'food', quantity: 5)
      entity.addMultipleItems [
        new Entities.Item(key: 'food', quantity: 10)
        new Entities.Item(key: 'wood', quantity: 5)
      ]
      console.log(entity.inventory)
      expect(entity.inventory.food.quantity).toBe 15
      expect(entity.inventory.wood.quantity).toBe 5
