class DrawableObject {
    constructor(pVertices) {
        this.setVertices(pVertices);
    } 
    getVertices() {
        const vertexData = this.mVertices.flatMap(v => [...v.mPosition, ...v.mColour])
        const float32Data = new Float32Array(vertexData);
        return float32Data;
    }
    numVertices() {
            return this.mVertices.length;
    }
    setVertices(pVertices) {
            this.mVertices = pVertices;
    }
    addVertices(pVertices) {
            this.mVertices = this.mVertices.concat(pVertices);
    }
    addVertex(pVertex) {
            this.mVertices.push(pVertex);
    }
    getVertex(pIndex) {
            return this.mVertices[pIndex];
    }
    
    
    static createTriangle(pColour = vec3.fromValues(0.0,  1.0,  1.0)) {
        let vertices = [
            new Vertex(vec3.fromValues(0.0,  0.5,  0.0), pColour),
            new Vertex(vec3.fromValues(-0.5, -0.5,  0.0), pColour),
            new Vertex(vec3.fromValues(0.5, -0.5,  0.0), pColour)
        ];
        return new DrawableObject(vertices);
    }
    static createQuad() {
        const vertices = new Float32Array([
            -0.5,  0.5, 0.0,
            0.5,  0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5,  0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ]);
        return new DrawableObject(vertices);
    }
}