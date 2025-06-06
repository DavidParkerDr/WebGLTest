class Vertex {
    constructor(pPosition, pColour, pNormal) {
        this.setPosition(pPosition);
        this.setColour(pColour);
        this.setNormal(pNormal);
    } 
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    setColour(pColour) {
        this.mColour = pColour;
    }
    setNormal(pNormal) {
        this.mNormal = pNormal;
    }
}