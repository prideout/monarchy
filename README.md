# Willow Chrome Experiment

- deploy to aws

- create & display texture for **William the Conquerer**

Example:

    var canvas2d = document.getElementById('canvas2d');
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas2d);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.enableVertexAttribArray(attribs.TEXCOORD);
    gl.vertexAttribPointer(attribs.TEXCOORD, 2, gl.FLOAT, false, 16, 8);
    
    // Set up a description of the vertex format.
    var bufferView = new GIZA.BufferView({
      p: [Float32Array, 2],
      t: [Float32Array, 2],
    });
    
    // Allocate and populate the ArrayBuffer.
    var vertexArray = bufferView.makeBuffer(numPoints);
    var iterator = bufferView.iterator();
    
    var vertex;
    vertex = iterator.next(); V2.set(vertex.p, [-1, -0.25]); V2.set(vertex.t, [0, 0]);
    vertex = iterator.next(); V2.set(vertex.p, [-1, 0.25]); V2.set(vertex.t, [0, 1]);
    vertex = iterator.next(); V2.set(vertex.p, [1, -0.25]); V2.set(vertex.t, [1, 0]);
    vertex = iterator.next(); V2.set(vertex.p, [1, 0.25]); V2.set(vertex.t, [1, 1]);
    
    // Create the vertex buffer object etc.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);
    gl.clearColor(0.6, 0.6, .6, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

- use casper to scrape [monarchs](http://www.doctorzebra.com/prez/a_monarc2.htm)
  - or, the wikipedia page?

- use fwidth / derivatives to make the stroke look nicer
