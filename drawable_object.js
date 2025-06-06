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
    static createCube(pColour = vec3.fromValues(0.0,  0.0,  1.0)) {
        let vertices = [
            // Front
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.5), pColour), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5,  0.5, 0.5), pColour), // Top-right vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, 0.5), pColour), // Bottom-right vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, 0.5), pColour), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, 0.5), pColour), // Bottom-right vertex
            new Vertex(vec3.fromValues(-0.5, -0.5, 0.5), pColour), // Bottom-left vertex 

            // Back
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5), pColour), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5,  0.5, -0.5), pColour), // Top-right vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, -0.5), pColour), // Bottom-right vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5), pColour), // Top-left vertex 
            new Vertex(vec3.fromValues(0.5, -0.5, -0.5), pColour), // Bottom-right vertex
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5), pColour), // Bottom-left vertex 

            //Left
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5),  pColour), // Top-back vertex 
            new Vertex(vec3.fromValues(-0.5, -0.5,  0.5),  pColour), // Top-front vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5,  0.5),  pColour), // Bottom-front vertex 
            new Vertex(vec3.fromValues(-0.5, -0.5, -0.5),  pColour), // Top-back vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5,  0.5),  pColour), // Bottom-front vertex 
            new Vertex(vec3.fromValues(-0.5,  0.5, -0.5),  pColour), // Bottom-back vertex 

            //Right
            new Vertex(vec3.fromValues( 0.5, -0.5, -0.5),  pColour),// Top-back vertex 
            new Vertex(vec3.fromValues( 0.5, -0.5,  0.5),  pColour), // Top-front vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5,  0.5),  pColour), // Bottom-front vertex 
            new Vertex(vec3.fromValues( 0.5, -0.5, -0.5),  pColour), // Top-back vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5,  0.5),  pColour), // Bottom-front vertex 
            new Vertex(vec3.fromValues( 0.5,  0.5, -0.5),  pColour), // Bottom-back vertex  

            //Top
            new Vertex(vec3.fromValues(-0.5, 0.5, -0.5),  pColour), // Left-back vertex 
            new Vertex(vec3.fromValues(-0.5, 0.5,  0.5),  pColour), // Left-front vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5,  0.5),  pColour), // Right-front vertex 
            new Vertex(vec3.fromValues(-0.5, 0.5, -0.5),  pColour), // Left-back vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5,  0.5),  pColour), // Right-front vertex 
            new Vertex(vec3.fromValues( 0.5, 0.5, -0.5),  pColour), // Right-back vertex 

            //Bottom
            new Vertex(vec3.fromValues(-0.5,  -0.5, -0.5),  pColour), // Left-back vertex 
            new Vertex(vec3.fromValues(-0.5,  -0.5,  0.5),  pColour), // Left-front vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5,  0.5),  pColour), // Right-front vertex 
            new Vertex(vec3.fromValues(-0.5,  -0.5, -0.5),  pColour), // Left-back vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5,  0.5),  pColour), // Right-front vertex 
            new Vertex(vec3.fromValues( 0.5,  -0.5, -0.5),  pColour) // Right-back vertex   
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