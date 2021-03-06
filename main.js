/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 4
*/



// file: header.js

/*
 APO craft
 by IchZerowan
 
 You are not welcome here!
*/

IMPORT("dimensions");



// file: blocks/terrain.js

IDRegistry.genBlockID("aetherDirt");
IDRegistry.genBlockID("aetherGrass");
IDRegistry.genBlockID("aetherStone");





// file: blocks/portal.js





// file: dimension/APOCity.js

var APOCity = new Dimension({
    name: "APOCity",
    
    generation: {
        layers: [
            // major islands
            { 
                range: [0, 80],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 0.7,
                        scale: [1, 1, 1]
                    }
                },
                
                gradient: [[-1, 0], [-0.8, 0], [-0.6, 0], [-0.4, 0], [-0.2, -0.1]],
               
                terrain: {
                    base: 1,
                    cover: {
                        height: 4,
                        top: 2,
                        block: 3
                    }
                }
            },
        ],
        
        decoration: {
            
        }
    },
    
    environment: {
        
    },
    
    callbacks: {
        tick: function() {
            APOCity.getWrappedObject().setSkyColor(Math.random(), Math.random(), Math.random());
        }
    }
});

APOCity.debugTerrainSlice(128, 1, true);


var APOCityTransferSequence = new TransferSequence(APOCity);
APOCityTransferSequence.setPortalTimeout(40);

APOCityTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

APOCityTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});

PortalRegistry.newPortalBlock("aetherPortal", ["aether_portal", 0], APOCityTransferSequence.getPortal(), {type: "u-plane", frameId: 4}, true);
APOCityTransferSequence.setPortalTiles(BlockID.aetherPortal);





var shape = new PortalShape();
shape.setPortalId(BlockID.aetherPortal);
shape.setFrameIds(4);
shape.setMinSize(2, 3);

APOCityTransferSequence.setPortalBuilder(shape.getBuilder());

Callback.addCallback("ItemUse", function(coords, item) {
    if (item.id == 280) {
        var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
        if (rect) {
            shape.buildPortal(rect, false);
        }
    }
});

Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == 4 || block.id == BlockID.aetherPortal) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.aetherPortal, [4]);
    }
});

























/*

var UndergroundJungle = new Dimension({
    name: "undergroundJungle",
    
    generation: {
        layers: [
            // main
            { 
                range: [0, 128],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 1.1,
                        scale: [.015, .0275, .015]
                    }
                },
                
                gradient: [
                    [0, 1],
                    [0.075, 1],
                    [0.125, .6],
                    [0.25, -.33],
                    [0.4, .1],
                    [0.5, .3],
                    [0.8, .3],
                    [0.925, 1],
                    [1, 1]
                ],
                
                terrain: {
                    base: BlockID.aetherDirt
                }
            },
        ],
        
        decoration: {
            biome: 4,
            features: true
        }
    },
    
    environment: {
        
    },
    
    transfer: {
        handler: {
            correctPosition: function(pos) {
                var y = 120;
                while (World.getBlockID(pos.x, y, pos.z) > 0 && y > 0) {
                    y--;
                }
                
                if (y < 10) {
                    y = 120;
                }
                
                pos.y = y;
            },
            
            buildPortal: function(pos) {
                for (var x = -1; x < 2; x++) {
                    for (var z = -1; z < 2; z++) {
                        for (var y = -2; y < 2; y++) {
                            World.setBlock(Math.floor(pos.x + x), Math.floor(pos.y + y), Math.floor(pos.z + z), y > -2 ? 0 : 1, 0);
                        }
                    }
                }
            }
        }
    },
    
    callbacks: {
        
    }
});

*/

















