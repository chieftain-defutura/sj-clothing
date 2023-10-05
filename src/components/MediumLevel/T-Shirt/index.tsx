import { StyleSheet, Image, View, Text, useWindowDimensions } from 'react-native'
import React, { Suspense, useLayoutEffect, useRef, useState } from 'react'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber/native'
import { TextureLoader } from 'expo-three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import THREE from 'three'
import { Decal, useGLTF, useTexture, Center } from '@react-three/drei'
import ExpoThree from 'expo-three'
import { radToDeg } from 'three/src/math/MathUtils'

const state = {
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: require('./threejs.png'),
  fullDecal: require('./threejs.png'),
}

function Polyhedron({ position, polyhedron }: any) {
  const ref = useRef<any>()
  const [count, setCount] = useState(0)

  console.log(polyhedron)

  useFrame((_, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += 0.5 * delta
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={'lime'} wireframe />
    </mesh>
  )
}

const Shirt = () => {
  // const loader = useLoader(GLTFLoader, require('./shirt_baked.glb'))
  // const [snap, setSnap] = useState(state)
  // console.log(JSON.stringify(Object.keys(loader), null, 2))
  const { nodes, materials } = useGLTF(require('./shirt_baked.glb'))

  // // useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  // const stateString = JSON.stringify(snap)

  return (
    <Center>
      <group>
        <mesh
          // ref={ref}
          // onPointerDown={() => {
          //   setCount((count + 1) % 3)
          // }}
          geometry={new THREE.BoxGeometry()}
        >
          <meshBasicMaterial color={'blue'} wireframe />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          dispose={null}
        ></mesh>
      </group>
    </Center>
  )
}

const TShirt: React.FC = () => {
  const width = useWindowDimensions().width

  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398),
  ]

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 80,
        width,
        height: width * 1.5,
      }}
    >
      {/* <Canvas
        // shadows
        // camera={{ position: [0, 0, 0], fov: 25 }}
        // gl={{ preserveDrawingBuffer: true }}
        style={{ flex: 1, backgroundColor: 'purple' }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Shirt />
        </Suspense>
      </Canvas> */}
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        {/* <Polyhedron position={[-0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[-0.75, 0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, 0.75, 0]} polyhedron={polyhedron} /> */}
        <Suspense fallback={null}>
          <Shirt />
        </Suspense>
      </Canvas>
      {/* <View style={[styles.selectSizeTShirt]}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View> */}
      {/* <View style={styles.selectSize360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View> */}
    </View>
  )
}

export default TShirt

const styles = StyleSheet.create({
  selectSizeTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1000,
  },
  selectSize360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
