let gl = null;
let shaderProgram;
let vertexArrayObject;
let drawableObject;
// Define vertices
const vertices = new Float32Array([
     0.0,  0.5,  0.0,
    -0.5, -0.5,  0.0,
     0.5, -0.5,  0.0
]);

const quadVertices = new Float32Array([
     -0.5,  0.5, 0.0,
      0.5,  0.5, 0.0,
      0.5, -0.5, 0.0,
     -0.5,  0.5, 0.0,
      0.5, -0.5, 0.0,
     -0.5, -0.5, 0.0
]);

window.addEventListener("load", main, false);

//
// start here
//
function main() {
  if(!initialiseGLContext())
  {
    alert(
      "Failed to initialise. Unable to continue.",
    );
    return;
  }
  let vertex = new Vertex(vec3.fromValues(1,0,0));
 
  drawableObject = DrawableObject.createTriangle();
  initialiseShaders();
  initialiseBuffers(drawableObject.getVertices());
  render();
}



function initialiseGLContext() {
  const canvas = document.querySelector("#gl-canvas");
  // Only continue if canvas is available and working
  if (canvas === null) {
    console.error('Unable to find canvas. This may be because you have not used the matching id as in the HTML file.');
    return false;
  }

  // Initialize the GL context
  gl = canvas.getContext("webgl2");

  // Only continue if WebGL is available and working
  if (gl === null) {
    console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
    return false;
  }
  return true;
}

// Create shader function
function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function buildShaderProgram(vertexShader, fragmentShader) {
  // Create shader program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return null;
  }
  return program;
}

function initialiseShaders() {
  // Vertex shader source
  const vsSource = document.getElementById("vertex-shader").firstChild.nodeValue;
  // Fragment shader source
  const fsSource = document.getElementById("fragment-shader").firstChild.nodeValue;

  // Create shaders
  const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

  shaderProgram = buildShaderProgram(vertexShader, fragmentShader);
}

function initialiseBuffers(vertices) {  
  // Create buffer and load vertex data
  // We need to send our vertices over to the graphics card so OpenGL can use them.
  // To do this, we need to create what's called a Vertex Buffer Object (VBO).
  // These allow you to upload a bunch of data to a buffer, and send the buffer to the graphics card.
  // This effectively sends all the vertices at the same time.

  // First, we need to create a buffer. This function returns a handle to it, but as of right now, it's empty.
  const vertexBuffer = gl.createBuffer();
  // Now, bind the buffer. OpenGL uses one global state, so after calling this,
  // all future calls that modify the VBO will be applied to this buffer until another buffer is bound instead.
  // The first argument is an enum, specifying what type of buffer we're binding. A VBO is an ArrayBuffer.
  // There are multiple types of buffers, but for now, only the VBO is necessary.
  // The second argument is the handle to our buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Finally, upload the vertices to the buffer.
  // Arguments:
  //   Which buffer the data should be sent to.
  //   How much data is being sent, in bytes. You can generally set this to the length of your array, multiplied by sizeof(array type).
  //   The vertices themselves.
  //   How the buffer will be used, so that OpenGL can write the data to the proper memory space on the GPU.
  //   There are three different BufferUsageHints for drawing:
  //     StaticDraw: This buffer will rarely, if ever, update after being initially uploaded.
  //     DynamicDraw: This buffer will change frequently after being initially uploaded.
  //     StreamDraw: This buffer will change on every frame.
  //   Writing to the proper memory space is important! Generally, you'll only want StaticDraw,
  //   but be sure to use the right one for your use case.
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


  // One notable thing about the buffer we just loaded data into is that it doesn't have any structure to it. It's just a bunch of floats (which are actaully just bytes).
  // The opengl driver doesn't know how this data should be interpreted or how it should be divided up into vertices. To do this opengl introduces the idea of a 
  // Vertex Array Obejct (VAO) which has the job of keeping track of what parts or what buffers correspond to what data. In this example we want to set our VAO up so that 
  // it tells opengl that we want to interpret 12 bytes as 3 floats and divide the buffer into vertices using that.
  // To do this we generate and bind a VAO (which looks deceptivly similar to creating and binding a VBO, but they are different!).
  vertexArrayObject = gl.createVertexArray();
  gl.bindVertexArray(vertexArrayObject);

  // Now, we need to setup how the vertex shader will interpret the VBO data; you can send almost any C datatype (and a few non-C ones too) to it.
  // While this makes them incredibly flexible, it means we have to specify how that data will be mapped to the shader's input variables.

  // To do this, we use the GL.VertexAttribPointer function
  // This function has two jobs, to tell opengl about the format of the data, but also to associate the current array buffer with the VAO.
  // This means that after this call, we have setup this attribute to source data from the current array buffer and interpret it in the way we specified.
  // Arguments:
  //   Location of the input variable in the shader. the layout(location = 0) line in the vertex shader explicitly sets it to 0.
  //   How many elements will be sent to the variable. In this case, 3 floats for every vertex.
  //   The data type of the elements set, in this case float; note a float is 4 bytes.
  //   Whether or not the data should be converted to normalized device coordinates. In this case, false, because that's already done.
  //   The stride; this is how many bytes are between the last element of one vertex and the first element of the next. 3 * sizeof(float) in this case.
  //   The offset; this is how many bytes it should skip to find the first element of the first vertex. 0 as of right now.
  // Stride and Offset are just sort of glossed over for now, but when we get into texture coordinates they'll be shown in better detail.
  // Link vertex attributes
  const aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 6 * 4, 0);
  gl.enableVertexAttribArray(aVertexPosition);
  const aVertexColour = gl.getAttribLocation(shaderProgram, 'aVertexColour');
  gl.vertexAttribPointer(aVertexColour, 3, gl.FLOAT, false, 6 * 4, 3 * 4);
  gl.enableVertexAttribArray(aVertexColour);
}

function render() {
  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Draw the triangle
  gl.bindVertexArray(vertexArrayObject);
  gl.useProgram(shaderProgram);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}