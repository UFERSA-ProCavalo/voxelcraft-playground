

// Função maluca

let v = Math.sin(x*z/ 30 + time) * 3;
let m = 1;
if (y - m <= v && v <= y + m)
    return 1 + (v/10 - Math.floor(v/10));


// Arvore com vento
// =====================
// Árvore
// =====================

function Paralelepipedo(pos, tam) {
    return (
        x >= pos.x && x <= pos.x + tam.x - 1 &&
        y >= pos.y && y <= pos.y + tam.y - 1 &&
        z >= pos.z && z <= pos.z + tam.z - 1
    );
}

// Tronco
if (Paralelepipedo(
    {x:0, y:0, z:0}, // Position
    {x:2, y:7, z:2}, // Tamanho
)) return 1;

let forca = 1;
let vento = Math.sin(time * 20 + z + x) * forca;

// Copa
if (Paralelepipedo(
    {x:-4, y:7, z:-4 + vento}, // Position
    {x:10, y:7, z:10}, // Tamanho
)) return 2;
if (Paralelepipedo(
    {x:-2, y:14, z:-2 + vento}, // Position
    {x:6, y:2, z:6}, // Tamanho
)) return 2;


// Chão
if (Paralelepipedo(
    {x:-10, y:0, z:-10},
    {x:22, y:1, z:22},
)) return 2;
if (Paralelepipedo(
    {x:-10, y:-5, z:-10},
    {x:22, y:5, z:22},
)) return 1;




// Homem que pula

function Paralelepipedo(pos, tam) {
    return (
        x >= pos.x && x <= pos.x + tam.x - 1 &&
        y >= pos.y && y <= pos.y + tam.y - 1 &&
        z >= pos.z && z <= pos.z + tam.z - 1
    );
}

function Boy(pos) {
    if (
        Paralelepipedo(
            {x:pos.x + 2, y:pos.y, z:pos.z},
            {x:2, y:5, z:2}
        )
    ) return 1;

    if (
        Paralelepipedo(
            {x:pos.x - 2, y:pos.y, z:pos.z},
            {x:2, y:5, z:2}
        )
    ) return 1;
    
    if (
        Paralelepipedo(
            {x:pos.x-2, y:pos.y + 5, z:pos.z},
            {x:6, y:5, z:2}
        )
    ) return 1;

    if (
        Paralelepipedo(
            {x:pos.x-8, y:pos.y + 9, z:pos.z},
            {x:18, y:2, z:2}
        )
    ) return 1;

    if (
        Paralelepipedo(
            {x:pos.x - 1, y:pos.y + 12, z:pos.z - 1},
            {x:4, y:4, z:4}
        )
    ) return 1;
}

let salto = Math.floor(Math.sin(time * 3) * 10);
// let s = salto > 0 ? salto : 0;
let s = Math.abs(salto);

if (y == -10) return 2;

if (y == -8 && z == Math.floor(Math.sin(time*3 + 10) * 10)) return 3;
return Boy({x:0, y: s - 10, z:0});



// -------------------------------
// Onda maluca (RGB plus)
// -------------------------------


// Write code here
function rgb(r, g, b) {
    return (
        (Math.floor(r*255) << 16) |
        (Math.floor(g*255) << 8) |
        (Math.floor(b*255))
    );
}


let m = 2;
let v = Math.sin(x * 0.3 + time * 3) * 5;

if (
    v >= y - m &&
    v <= y + m
) return rgb(0, (y+6) / 12, time % 60 / 120 + x / 64);