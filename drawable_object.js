class DrawableObject {
    constructor(pVertices) {
        this.setVertices(pVertices);
    } 
    getVertices() {
        const vertexData = this.mVertices.flatMap(v => [...v.mPosition, ...v.mColour, ...v.mNormal])
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
    static createQuad(pColour = vec3.fromValues(0.0,  1.0,  1.0)) {
        let vertices = [
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.0), pColour),
            new Vertex(vec3.fromValues(0.5,  0.5, 0.0), pColour),
            new Vertex(vec3.fromValues(0.5, -0.5, 0.0), pColour),
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.0), pColour),
            new Vertex(vec3.fromValues(0.5, -0.5, 0.0), pColour),
            new Vertex(vec3.fromValues(-0.5, -0.5, 0.0), pColour)
        ];
        return new DrawableObject(vertices);
    }
    static createCube(pColour = vec4.fromValues(1.0,  1.0,  1.0, 1.0)) {
        let frontNormal = vec3.fromValues(0.0, 0.0, 1.0);
        let backNormal = vec3.fromValues(0.0, 0.0, -1.0);
        let leftNormal = vec3.fromValues(-1.0, 0.0, 0.0);
        let rightNormal = vec3.fromValues(1.0, 0.0, 0.0);
        let topNormal = vec3.fromValues(0.0, 1.0, 0.0);
        let bottomNormal = vec3.fromValues(0.0, -1.0, 0.0);
        let vertices = [
            // Front
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.5), pColour, frontNormal), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5,  0.5, 0.5), pColour, frontNormal), // Top-right vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, 0.5), pColour, frontNormal), // Bottom-right vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.5), pColour, frontNormal), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, 0.5), pColour, frontNormal), // Bottom-right vertex
            new Vertex(vec3.fromValues(-0.5, -0.5, 0.5), pColour, frontNormal), // Bottom-left vertex 

            // Back
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5), pColour, backNormal), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5,  0.5, -0.5), pColour, backNormal), // Top-right vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, -0.5), pColour, backNormal), // Bottom-right vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5), pColour, backNormal), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, -0.5), pColour, backNormal), // Bottom-right vertex
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5), pColour, backNormal), // Bottom-left vertex 

            //Left
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5),  pColour, leftNormal), // Top-back vertex 
            new Vertex(vec3.fromValues(-0.5, -0.5,  0.5),  pColour, leftNormal), // Top-front vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5,  0.5),  pColour, leftNormal), // Bottom-front vertex 
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5),  pColour, leftNormal), // Top-back vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5,  0.5),  pColour, leftNormal), // Bottom-front vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5),  pColour, leftNormal), // Bottom-back vertex 

            //Right
            new Vertex(vec3.fromValues( 0.5, -0.5, -0.5),  pColour, rightNormal),// Top-back vertex 
            new Vertex(vec3.fromValues( 0.5, -0.5,  0.5),  pColour, rightNormal), // Top-front vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5,  0.5),  pColour, rightNormal), // Bottom-front vertex 
            new Vertex(vec3.fromValues( 0.5, -0.5, -0.5),  pColour, rightNormal), // Top-back vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5,  0.5),  pColour, rightNormal), // Bottom-front vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5, -0.5),  pColour, rightNormal), // Bottom-back vertex  

            //Top
            new Vertex(vec3.fromValues(-0.5, 0.5, -0.5),  pColour, topNormal), // Left-back vertex 
            new Vertex(vec3.fromValues(-0.5, 0.5,  0.5),  pColour, topNormal), // Left-front vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5,  0.5),  pColour, topNormal), // Right-front vertex 
            new Vertex(vec3.fromValues(-0.5, 0.5, -0.5),  pColour, topNormal), // Left-back vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5,  0.5),  pColour, topNormal), // Right-front vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5, -0.5),  pColour, topNormal), // Right-back vertex 

            //Bottom
            new Vertex(vec3.fromValues(-0.5,  -0.5, -0.5),  pColour, bottomNormal), // Left-back vertex 
            new Vertex(vec3.fromValues(-0.5,  -0.5,  0.5),  pColour, bottomNormal), // Left-front vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5,  0.5),  pColour, bottomNormal), // Right-front vertex 
            new Vertex(vec3.fromValues(-0.5,  -0.5, -0.5),  pColour, bottomNormal), // Left-back vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5,  0.5),  pColour, bottomNormal), // Right-front vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5, -0.5),  pColour, bottomNormal) // Right-back vertex   
        ];
        return new DrawableObject(vertices);
    }
    static createCircle(numberOfSegments = 30, pColour = vec3.fromValues(0.0,  1.0,  1.0)) {
        let vertices = [];
        let radius = 0.5;
        let angleIncrement = 2.0 * Math.PI / numberOfSegments;
        let centreVertex = new Vertex(vec3.fromValues(0.0, 0.0, 0.0), pColour);
        let previousVertex = null;
        let firstVertexIndex = 1;
        for (let i = 0; i < numberOfSegments; i++)
        {
            let angle = i * angleIncrement;
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);

            let position = vec3.fromValues(x, y, 0.0);
            let currentVertex = new Vertex(position, pColour);
            
            if(i > 0)
            {
                vertices.push(centreVertex);
                vertices.push(previousVertex);
                vertices.push(currentVertex);
            }
            previousVertex = currentVertex;
        }
        vertices.push(centreVertex);
        vertices.push(vertices[firstVertexIndex]);
        vertices.push(previousVertex);
        return new DrawableObject(vertices);
    }
}