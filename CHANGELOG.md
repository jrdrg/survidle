# Changelog

## 0.1.x

### Added
- Added ability to gather resources from the map screen
- Added description of items when hovering on them in the sidebar
- Added bandits, track you if you have a cabin (because they see the smoke)
- Added alert for when the cell the player is on is empty
- Added **Scythe** item that allows you to gather food more quickly from fields
- Added **Cooking** technology to automatically eat when hungry
- Added ability to build structures directly on the map
- Added state of current research to status bar
- Added some shortcuts to the inventory/crafting/actions in the map view
- Added ability to repair structures if enemies damage them

### Changed
- Made the starting cell always populated wiht some resources
- Items you are out of are now hidden automatically from the inventory
- Revenues now go to the cell the structure was built on instead of directly to the player
- Dropped items now go to the cell the player is in instead of being destroyed
- Allow players to craft items if they'd have enough space in inventory *after* the craft
- Map is now bigger than visible part and can be navigated in via hotzones or buttons

### Fixed
- You can no longer build multiple structures on a single cell
- Fixed a bug where building a wolf trap would crash the game
- Fixed missing rocks on the map
- Fixed a bug where you couldn't build structures if your inventory was full

## 0.1.0

### Added
- Initial release
