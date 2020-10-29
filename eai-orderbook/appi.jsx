import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import { Header, Modal, Segment } from "semantic-ui-react";
  import "semantic-ui-css/semantic.min.css";




  // ------------------
import usedata from "./usedata"
import Head from "./head"
import Filter from "./filter"
import Search from "./search"

import Detalle from "./detalle"


import Cat from "./cat"
import Order from "./order"
import Cliente from "./cliente"

import Cuenta from "./cuenta"


let App;
const StateContext = createContext();

// -------------------------------------------

let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: {
      DataMain: useState(useContext(createContext(false))),
      Registros: useState(useContext(createContext(false))),
      Detalle: useState(useContext(createContext(false))),

    },

    Extend: {
      Filter: useState(useContext(createContext(true))),
      Search: useState(useContext(createContext(true))),
      Cat: useState(useContext(createContext(true))),
      Order: useState(useContext(createContext(true))),
      Cliente: useState(useContext(createContext(true))),

      Cuenta: useState(useContext(createContext(true))),
    },

    Modal: {
      Open: useState(useContext(createContext(false))),

    },


    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
    },
    
    Empresa: useState(useContext(createContext(1))),
    Sucursal: useState(useContext(createContext({value: 6}))),
    Pedido: useState(useContext(createContext(9999))),
    PedidoData: useState(useContext(createContext({}))),
    Registros: useState(useContext(createContext([]))),
    Consumos: useState(useContext(createContext([]))),

    Detalle: useState(useContext(createContext({}))),
    DetalleExtras: useState(useContext(createContext([]))),




    Search: useState(useContext(createContext(""))),

    Filtro: { 
      Proceso: useState(useContext(createContext({
        TOSTADAS: {Activo: false, Color: "#4682B4"},
        ENTRADAS: {Activo: false, Color: "#F4A460"},
        SOPAS: {Activo: false, Color: "#C71585"},
        ARROCES: {Activo: false, Color: "#66CDAA"},
        POKES: {Activo: false, Color: "#66CDAA"},
        NATURALES: {Activo: false, Color: "#F4A460"},
        CALIENTES: {Activo: false, Color: "#F4A460"},
        HORNEADOS: {Activo: false, Color: "#F4A460"},
        VEGETARIANOS: {Activo: false, Color: "#F4A460"},
        PREMIUM: {Activo: false, Color: "#F4A460"},
        PLATILLOS: {Activo: false, Color: "#C71585"},
        RAMEN: {Activo: false, Color: "#C71585"},
        POSTRES: {Activo: false, Color: "#C71585"},
        BEBIDAS: {Activo: false, Color: "#C71585"},
        INFANTIL: {Activo: false, Color: "#C71585"},
        "ROLLO DEL MES": {Activo: false, Color: "#C71585"},
        EXTRAS: {Activo: false, Color: "#C71585"},
        TODOS: {Activo: true, Color: "#C71585"},

      }))),
    },

  };
}

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

// --------------------------------------------------------------------------

let useStatus = function(StateContextM) {
  return {
    head: function() { return 1 },
    filter: function() { return 1 },
    search: function() { return 1 },
    cat: function() { return 1 },
    order: function() { return 1 },
    cliente: function() { return 1 },

    cuenta: function() { return 1 },
  }
}

// --------------------------------------------------------------------------


let useAcciones = function(StateContext) {
  const useData = new usedata()
  const [LoadingDataMain, setLoadingDataMain] = useContext(StateContext).Loading.DataMain
  const [Registros, setRegistros] = useContext(StateContext).Registros
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Consumos, setConsumos] = useContext(StateContext).Consumos
  const [OpenModal, setOpenModal] = useContext(StateContext).Modal.Open
  const [Detalle, setDetalle] = useContext(StateContext).Detalle
  const [DetalleExtras, setDetalleExtras] = useContext(StateContext).DetalleExtras
  const [LoadingDetalle, setLoadingDetalle] = useContext(StateContext).Loading.Detalle


  // ---------------------
  
  return {

    useChange : (Field, setField) => {
      return {
        name: Field,
        value: Field,
        fontSize: 1,
        color: "#595959",
        bg: "#DCDCDC",
        onChange: e => {
          setField(e.target.value)
        }
      }
    },

    useChangeArray : (MiArray, Field, setField, setEditado) => {
      return {
        name: Field,
        value: MiArray[Field],
        fontSize: 1,
        color: "#FFFFF",
        bg: "#FFFFF",
        onChange: e => {
          setField({ ...MiArray, [Field]: e.target.value });
          setEditado ? setEditado(true) : console.log("no editado")
        }
      };
    },







    Loader : async function (props) {
      setLoadingDataMain(true)
        let useDataRes = await useData.Pedidos().get({Id: props.id})
        setPedidoData(useDataRes[0])
        // let useDataRes = await useData.Productos().get({Sucursal: 6})
        // setRegistros(useDataRes)
      setLoadingDataMain(false)
    },

    LoaderCat : async function (e) {
      console.log({e})
      // setLoadingDataMain(true)
        let useDataRes = await useData.Productos().get({Sucursal: e.Sucursal ? e.Sucursal : 99})
        setRegistros(useDataRes)

        let useDataResC = await useData.Consumos().get2(PedidoData.Id ? PedidoData.Id : 99999)
        setConsumos(useDataResC)

      setLoadingDataMain(false)
    },

    LoaderCuenta : async function (props) {
     // setLoadingRegistros(true)
        let useDataRes = await useData.Consumos().get2(PedidoData.Id ? PedidoData.Id : 99999)
        setConsumos(useDataRes)
      // setLoadingRegistros(false)
    },

    getDetalle : async function (e) {
      setLoadingDetalle(true)
        setOpenModal(true)
         let useDataResC = await useData.Productos().getDetalle(e)
 
            let MiDetalle = {...useDataResC,
            "ProductosId": useDataResC.Producto,
            "ConsumosPrecio": useDataResC.Precio,
            "ConsumosPrecioObv": useDataResC.PrecioObv,
            "ConsumosDescuento": [""],
            "ConsumosCantidad": 1,
            "ConsumosImporte": useDataResC.Precio,
            "ConsumosObv": "",
            "CategoriasTitulo": useDataResC.CategoriasTitulo,
            }
    
            setDetalle(MiDetalle)

            let useDataResD = await useData.Extras().get(e)
            setDetalleExtras(useDataResD)

            setLoadingDetalle(false)

     },





    addConsumo : async function (e) {
     // setLoadingDataMain(true)
        let useDataResC = await useData.Consumos().add(e)

        let useDataRes = await useData.Consumos().get2(PedidoData.Id)
        setConsumos(useDataRes)

      //  setRegistros(useDataRes)
    // setLoadingDataMain(false)
    },


    delConsumo : async function (e) {
      // setLoadingDataMain(true)
         let useDataResC = await useData.Consumos().del(e)
 
         let useDataRes = await useData.Consumos().get2(PedidoData.Id)
         setConsumos(useDataRes)
 
       //  setRegistros(useDataRes)
     // setLoadingDataMain(false)
     },






  }
}

// -----------------------------------------------------------------------------


const Body = props => {
  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [ExtendCuenta, setExtendCuenta] = useContext(StateContext).Extend.Cuenta
  const [OpenModal, setOpenModal] = useContext(StateContext).Modal.Open

// ------------
useEffect(() => { useacciones.Loader(props) }, [])

useEffect(() => { useacciones.LoaderCat(PedidoData) }, [PedidoData.Id])

useEffect(() => { if(ExtendCuenta){useacciones.LoaderCuenta()}}, [ExtendCuenta]);


// ------------

try {

  return (

    <div>

      <Modal
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={OpenModal}
      >

        <Modal.Description>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Grid sx={{ width: "330px" }}>
              <Detalle
                useContext={useContext(StateContext)}
                useAcciones = {useacciones}
                useStatus = {usestatus}
              />
            </Grid>
          </div>
        </Modal.Description>
      </Modal>





    <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
      <Flex sx={{width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <main>
            <Head 
              useContext={useContext(StateContext)}
             // useAcciones = {useacciones}
               useStatus = {usestatus}
            />
            
            <Box css={{ height: "1px" }} />


            <Filter 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />

            <Box css={{ height: "3px" }} />

            <Search 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />

            <Box css={{ height: "3px" }} />

            <Cat 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />

          </main>

        </Box>
      </Flex>

    </Flex>
    </div>
  )
    
} catch (e) {
  console.error(e);
}
}


// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------


const Body2 = props => {
  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

// ------------


// ------------

try {

  return (

    <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
      <Flex sx={{width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <main>
            <Head 
              useContext={useContext(StateContext)}
             // useAcciones = {useacciones}
               useStatus = {usestatus}
            />
            
            <Box css={{ height: "1px" }} />

            <Order 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />
            <Box css={{ height: "3px" }} />

            <Cliente 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />
            <Box css={{ height: "3px" }} />


            <Cuenta 
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
              useStatus = {usestatus}
            />

          </main>

        </Box>
      </Flex>

    </Flex>

  )
    
} catch (e) {
  console.error(e);
}
}

// -----------------------------------------------------------------------------






// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider>

        <Flex bg="WhiteSmoke"
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: 'center',
            mr:7
          }}
          css={{ maxWidth: "768px", minWidth: "375px" }}
        >
          <header sx={{width: "100%"}}>
          </header>

          <main sx={{width: "100%"}}>
            <Body2 {...props} />
          </main>

        </Flex>


        <Flex bg="WhiteSmoke"
          sx={{
            display: "flex",
            flexDirection: "column",
            //justifyContent: 'center'
          }}
          css={{ maxWidth: "768px", minWidth: "375px" }}
        >
          <header sx={{width: "100%"}}>
          </header>

          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>

        </Flex>



      </ContextProvider>

    </div>
  );
});

// ----------------------------------------------------------------------------

