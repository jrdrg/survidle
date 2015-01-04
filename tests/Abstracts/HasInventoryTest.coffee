describe 'HasInventory', ->
  scope = null
  entity = null;

  beforeEach module('survidle')
  beforeEach inject(($rootScope) ->
    scope = $rootScope.$new()
    entity = new Abstracts.HasInventory
    entity.inventory = (food: new Entities.Item(key: 'food', quantity: 5))
  )

  describe '#add', ->
    it 'Adds an item to the inventory', ->
      entity.add new Entities.Item(key: 'foobar')
      expect(entity.inventory.foobar.quantity).toBe 1

  describe '#addMultipleItems', ->
    it 'Adds multiple items to the inventory', ->
      entity.addMultipleItems [
        new Entities.Item(key: 'food', quantity: 10)
        new Entities.Item(key: 'wood', quantity: 5)
      ]

      expect(entity.inventory.food.quantity).toBe 15
      expect(entity.inventory.wood.quantity).toBe 5

    it 'Stops adding items when full inventory', ->
      entity.inventoryCapacity = 10;
      entity.addMultipleItems [
        new Entities.Item(key: 'wood', quantity: 5)
        new Entities.Item(key: 'food', quantity: 10)
      ]

      expect(entity.inventory.wood.quantity).toBe 5
      expect(entity.inventory.food.quantity).toBe 5

    it 'Can multiply values by a number', ->
      entity.addMultipleItems [
        new Entities.Item(key: 'food', quantity: 10)
      ], 2

      new Entities.Item(key: 'food', quantity: 20)

  describe '#removeMultipleItems', ->
    it 'Removes multiple items from the inventory', ->
      entity.removeMultipleItems (food: 5)
      expect(entity.inventory.food.quantity).toBe 0

  describe '#has', ->
    it 'Can check existence of an item', ->
      expect(entity.has('food')).toBe true
      expect(entity.has('foobar')).toBe false
    it 'Can check existence of a quantity', ->
      expect(entity.has('food', 5)).toBe true
      expect(entity.has('food', 10)).toBe false
    it 'Can check existence of structures', ->
      entity.inventory['cabin'] = new Entities.Item(key: 'cabin', type: 'structure', quantity: 0.5)
      expect(entity.has('cabin')).toBe true

  describe '#hasMultiple', ->
    it 'Can check presence of multiple items', ->
      expect(entity.hasMultiple(food: 5)).toBe true
      expect(entity.hasMultiple(food: 5, foobar: 5)).toBe false

  describe '#drop', ->
    it 'Drops one item from the inventory', ->
      entity.drop('food')
      expect(entity.inventory.food.quantity).toBe 4
    it 'Can drop multiple units at once', ->
      entity.drop('food', 2)
      expect(entity.inventory.food.quantity).toBe 3

  describe '#getItemsOfType', ->
    it 'Can get all items of a certain type', ->
      entity.inventory = [
        new Entities.Item(key: 'food', type: 'resource', quantity: 5)
        new Entities.Item(key: 'cabin', type: 'structure', quantity: 1)
      ]
      expect(entity.getItemsOfType('resource').length).toBe 1

  describe '#getInventorySize', ->
    it 'Gets the total units in the inventory', ->
      entity.inventory = [
        new Entities.Item(key: 'food', type: 'resource', quantity: 5)
        new Entities.Item(key: 'cabin', type: 'structure', quantity: 1)
      ]
      expect(entity.getInventorySize()).toBe 6

  describe '#hasEmptyInventory', ->
    it 'Can check if the inventory is empty', ->
      entity.drop('food', 5)
      expect(entity.hasEmptyInventory()).toBe true

  describe '#hasFullInventory', ->
    it 'Can check if the inventory is empty', ->
      entity.inventoryCapacity = 5
      expect(entity.hasFullInventory()).toBe true

