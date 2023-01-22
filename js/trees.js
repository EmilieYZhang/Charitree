//
// #TeamTrees Web Version
// John Fish, Nov 2019
//

// README: generate an API key here: https://wrapapi.com/api/johnfish/teamtrees/treecount/0.0.1
// it will not update without such a key
var wrapAPIKey = "key goes in between the quotes";

// Various three.js global variables
var scene,
    camera,
    renderer,
    controls,
    group;

// Tracking tree count
var numTrees = 10000;
var finalTrees = 1000000
var curTrees = 0;

// Leaf materials
var leaveDarkMaterial = new THREE.MeshLambertMaterial({ color: 0x91E56E });
var leaveLightMaterial = new THREE.MeshLambertMaterial({ color: 0xA2FF7A });
var stemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var flowerDarkMaterial = new THREE.MeshLambertMaterial({ color: 0xE5806E });
var flowerLightMaterial = new THREE.MeshLambertMaterial({ color: 0xCC4027 });
var fStemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });
var fBulbMaterial = new THREE.MeshLambertMaterial({ color: 0xFBEC5D });
var fCubeGeometry = new THREE.SphereGeometry(1, 1, 1);
var temp = new THREE.BoxGeometry(1, 1, 1, 7, 0.2)

var thirdDarkMaterial = new THREE.MeshLambertMaterial({ color: 0xE5806E });
var thirdLightMaterial = new THREE.MeshLambertMaterial({ color: 0xA865C9 });
var thirdStemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });
var thirdBulbMaterial = new THREE.MeshLambertMaterial({ color: 0xFBEC5D });
var thirdCubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var radius = 35; // Planet radius

// Takes number, formats as currency... stolen from stackoverflow
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Retrieve trees from wrapapi, update text + grow trees when appropriate
function fetchTrees() {
  $.ajax({
      url: "https://wrapapi.com/use/johnfish/teamtrees/treecount/0.0.1",
      method: "POST",
      data: {
            "wrapAPIKey": wrapAPIKey 
          }
  }).done(function(data) {
      if (data.success) {
        numTrees = data["data"]["#totalTrees"]; 
      }
      $("#cash").text("Charity A - $"+formatNumber(numTrees)+" out of $" + formatNumber(finalTrees))
      var diff = Math.floor(numTrees / 10000) - curTrees
      if (diff > 0) {
        curTrees += diff
        growTrees(diff)
      }
  });
}

// Generate a planet at (0,0,0) with specified radius
function planet(r) {

  //vanshree - changed the background color of the tree
  var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x355163});
  var planetGeometry = new THREE.SphereGeometry(r, 100, 100); 
  var planet = new THREE.Mesh(planetGeometry, groundMaterial);
  planet.position.set(0,0,0);
  scene.add(planet)
}

// Generate a simple tree, rotated with provided angles
function tree(angles) {
    var stem = new THREE.Mesh(cubeGeometry, stemMaterial );
    stem.position.set(0, radius + 0.75, 0 );
    stem.scale.set( 1.8, 2.8, 1.8 );

    var leaveDark = new THREE.Mesh(cubeGeometry, leaveDarkMaterial );
    leaveDark.position.set( 0, radius + 2.7, 0 );
    leaveDark.scale.set( 2.5, 3.5, 2.5 );

    var leaveLight = new THREE.Mesh(cubeGeometry, leaveLightMaterial );
    leaveLight.position.set( 0, radius + 2.7, 0 );
    leaveLight.scale.set( 2.9, 2.0, 2.9 );


    var tree = new THREE.Group();
    tree.add( leaveDark );
    tree.add( leaveLight );
    tree.add( stem );

    tree.rotation.set(angles[0], angles[1], angles[2])

    return tree
}

// Generate a simple tree, rotated with provided angles
function flower(angles) {
  var stem = new THREE.Mesh(fCubeGeometry, fStemMaterial );
  stem.position.set(0, radius + 0.75, 0 );
  stem.scale.set( 1.3, 2.5, 1.3 );

  var bulb = new THREE.Mesh(fCubeGeometry, fBulbMaterial );
  bulb.position.set(0, radius + 2.6, 0 );
  bulb.scale.set( 0.8, 0.8, 0.8 );

  var flowerDark = new THREE.Mesh(fCubeGeometry, flowerDarkMaterial );
  // flowerDark.position.set( 0, radius + 1.2, 0 );
  // flowerDark.scale.set( 1, 2, 1 );
  // flowerDark.position.set( 0, radius + 1.5, 0 );
  // flowerDark.scale.set( 0.5, 0.5, 1.4 );

  var flowerLight = new THREE.Mesh(fCubeGeometry, flowerLightMaterial );
  flowerLight.position.set( 0, radius + 1.9, 0 );
  flowerLight.scale.set( 2.4, 1.5, 2.4 );

  var flower = new THREE.Group();
  // flower.add( flowerDark );
  flower.add(bulb);
  flower.add( flowerLight );
  flower.add( stem );

  flower.rotation.set(angles[0], angles[1], angles[2])

  return flower
}

// Generate a simple tree, rotated with provided angles
function flower2(angles) {
  var stem = new THREE.Mesh(thirdCubeGeometry, thirdStemMaterial );
  stem.position.set(0, radius + 0.75, 0 );
  stem.scale.set( 1.3, 2.5, 1.3 );

  var bulb = new THREE.Mesh(thirdCubeGeometry, thirdBulbMaterial );
  bulb.position.set(0, radius + 2.4, 0 );
  bulb.scale.set( 0.8, 0.8, 0.8 );

  var flower2Dark = new THREE.Mesh(thirdCubeGeometry, thirdStemMaterial );
  
  var flower2Light = new THREE.Mesh(thirdCubeGeometry, thirdLightMaterial );
  flower2Light.position.set( 0, radius + 1.9, 0 );
  flower2Light.scale.set( 2.4, 1.5, 2.4 );

  var flower2 = new THREE.Group();
  // flower.add( flowerDark );
  flower2.add(bulb);
  flower2.add( flower2Light );
  flower2.add( stem );

  flower2.rotation.set(angles[0], angles[1], angles[2])

  return flower2
}

// Generate a random angle triple from [0, 2PI]
function randomAngleTriple() {
  return [
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random()
  ]
}

// Add n trees to scene randomly
function growTrees(n) {

  // vanshree - add only 10 trees to planet
  // for (var i = 0; i < n; i++) {
  for (var i = 0; i < 15; i++) {
    scene.add(tree(randomAngleTriple()))
  }

  for (var i = 0; i < 15; i++) {
    scene.add(flower(randomAngleTriple()))
  }

  for (var i = 0; i < 15; i++) {
    scene.add(flower2(randomAngleTriple()))
  }
}

function init() {
    // Update tree count regularly
    fetchTrees()
    setInterval(fetchTrees, 30000)

    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight( 0xDDEED3, 1 );
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set( 0, 0, 1 );

    scene.add(light1);
    scene.add(light2);
    scene.add(planet(radius));

    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
}

function render() {
    requestAnimationFrame( render );
    controls.update();
    renderer.render( scene, camera );
}

init();
render();
