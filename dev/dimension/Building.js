var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var StringBuilder = java.lang.StringBuilder;


function Building(filename){
    var path = __dir__ + "buildings/" + filename;
    
    var blocks;
    
    var json = JSON.parse(readFile(path));
    if(Array.isArray(json)){
        blocks = json;
    } else {
        blocks = json.blocks;
    }
    
    this.build = function(x1, y1, z1){
        //Choose random block for generation
        var randoms = [];
        for(var key in json.randomizer){
            var randomizer = json.randomizer[key];
            var arr = randomizer.variations;
            randoms.push({
                "block": randomizer.block, 
                "variation": arr[Math.round(Math.random()*(arr.length-1))]
            });
        }
        //generation itself
        for(var y = 0; y < blocks.length; y++){
            for(var x = 0; x < blocks[0].length; x++){
                for(var z = 0; z < blocks[0][0].length; z++){
                    var block = blocks[y][x][z];
                    if(block == 0 || block.id == 0)
                        continue;
                    block.meta = block.meta || 0;
                    for(var key in randoms){
                        var random = randoms[key];
                        if(random.block.id == block.id && random.block.meta == block.meta){
                            block = random.variation;
                        }
                    }
                    World.setBlock(x + x1, y + y1, z + z1, block.id, block.meta);
                }
            }
        }
    }
}










function readFile(path){
    var reader = new BufferedReader(new FileReader(path));
    var builder = new StringBuilder();
    
    try{
        var line = reader.readLine();
        while (line != null) {
            builder.append(line);
            line = reader.readLine();
        }
        return builder.toString();
    } catch(e){
        Game.message(e);
    }
}