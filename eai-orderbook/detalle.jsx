import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Textarea } from "@theme-ui/components";
import Theme from "./theme"

import Extras from "./extras"

let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    PrecioOp: useState(useContext(createContext(1))),

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.Detalle
  const [LoadingRegistros, setLoadingRegistros] = props.useContext.Loading.Registros
  const [PedidoData, setPedidoData] = props.useContext.PedidoData

  const [Detalle, setDetalle] = props.useContext.Detalle
  const [DetalleExtras, setDetalleExtras] = props.useContext.DetalleExtras

  const [PrecioOp, setPrecioOp] = useContext(StateContext).PrecioOp;

  const [OpenModal, setOpenModal] = props.useContext.Modal.Open


// ----------------------------------

const sumExtras = () => DetalleExtras.reduce((a, b) => a + Number((b.ExtrasDetCantidad * b.ExtrasDetPrecio)), 0)

const OpcionesPrecio  = () => {


  return (
    <div>



      <Flex sx={{ width: "100%", }}>

        <Box sx={{ width: "50%" }}>

          {(Detalle.Precio>0) ? (

            <Button
              sx={{
                width: "100%",
                bg: "transparent",
                p:0
              }}
              onClick={async () => {
                setPrecioOp(1)
                await setDetalle({ ...Detalle, 
                  "ConsumosPrecio": Detalle.Precio,
                  "ConsumosPrecioObv": Detalle.PrecioObv
                })
              }}
            >

              <Flex sx={{ width: "100%" }}>
                <Text sx={{
                  fontSize: 5,
                  fontFamily: "body",
                  fontWeight: "bold",
                  color: PrecioOp===1 ? "#404040" : "#A9A9A9",
                  mt: 4,
                  mb: 2
                  }}>${Detalle.Precio}</Text>



                <Text sx={{
                  fontSize: 2,
                  fontFamily: "body",
                  fontWeight: "body",
                  color: PrecioOp===1 ? "#404040" : "#A9A9A9",
                  mt: 1,
                  mb: 1,
                  ml:3,
                  pt:"18px",
                  
                }}>{Detalle.PrecioObv}</Text>
              </Flex> 

            </Button>

          ) : (<div/>)}

        </Box>


        <Box sx={{ width: "50%" }}>

        {(Detalle.Precio2>0) ? (

        <Button
          sx={{
            width: "100%",
            bg: "transparent",
            p:0
          }}
          onClick={async () => {
            setPrecioOp(2)
            await setDetalle({ ...Detalle, 
              "ConsumosPrecio": Detalle.Precio2,
              "ConsumosPrecioObv": Detalle.PrecioObv2
            })
          }}
        >

          <Flex sx={{ width: "100%" }}>
            <Text sx={{
              fontSize: 5,
              fontFamily: "body",
              fontWeight: "bold",
              color: PrecioOp===2 ? "#404040" : "#A9A9A9",
              mt: 4,
              mb: 2,
            
              }}>${Detalle.Precio2}</Text>



            <Text sx={{
              fontSize: 2,
              fontFamily: "body",
              fontWeight: "body",
              color: PrecioOp===2 ? "#404040" : "#A9A9A9",
              mt: 1,
              mb: 1,
              ml:3,
              pt:"18px",
            }}>{Detalle.PrecioObv2}</Text>
          </Flex> 


      </Button>

        ) : (<div/>)}

        </Box>


      </Flex>

    </div>

  )
}











// ----------------------------------

try {

  return (
    <Grid sx={{p:0, m: 0, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

      {Loading ? <Spinner size={17} ml={3} /> : 
        <div>
          <Flex sx={{ width: "100%" }}>
            <Box
              bg="primary"
              sx={{
                fontWeight: "normal",
                fontSize: 1,
                color: "text",
                fontFamily: "body",
                width: "100%"
              }}
            >
              <Image sx={{ width: "100%" }} src={Detalle.ProductosFoto2} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t1}>{Detalle.ProductosTitulo}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%", mt:2, mb:3 }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.d1}>{Detalle.ProductosDescripcion} </Text>
            </Box>
          </Flex>



          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.d1}>{Detalle.ProductosObv} </Text>
            </Box>
          </Flex>




          {OpcionesPrecio()}




          <Text sx={Estilo.h2}>Indicaciones:</Text>

          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "100%" }}>
              <Textarea
                {...props.useAcciones.useChangeArray(Detalle, "ConsumosObv", setDetalle)}
                rows={3}
              />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Text
              sx={{ height: "100%", mb: 3, fontSize: 2, }}
              mr={3}
            > Cantidad:
            </Text>

            <Button
              sx={Estilo.p1s}
              w={"40px"}
              bg={"#DCDCDC"}
              onClick={() => {
                setDetalle({ ...Detalle, "ConsumosCantidad": Detalle.ConsumosCantidad - 1 });
              }}
            >
              - 
            </Button>

            <Text pl={3}  pr={3} sx={Estilo.p2s}>{Detalle.ConsumosCantidad} </Text>

            <Button
              sx={Estilo.p1s}
              bg={"#DCDCDC"}
              Disabled={false}
              onClick={() => {
                setDetalle({ ...Detalle, "ConsumosCantidad": Detalle.ConsumosCantidad  + 1 });
              }}
            >
              + 
            </Button>
          </Flex>





          <Box sx={{ width: "70%", height: "34px" }}>
            <Button
              sx={{ height: "100%", mb: 3, width: "100%", fontSize: 2, }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={() => {                      
                props.useAcciones.addConsumo({
                  Pedido: PedidoData.Id,
                  Producto: Detalle.Producto,
                  Precio: Detalle.Precio,
                  Cantidad: Detalle.ConsumosCantidad,
                  Importe: (Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + sumExtras())),
                  Obv: Detalle.ConsumosObv
                })

                setOpenModal(false)

              }}
            >
              {/* Agregar $ {Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + useDataMx.Extras().sum)} */}

              Agregar $ {Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + sumExtras() )}


            </Button>
          </Box>







          <Extras {...props}
            texto="Producto"
            useContext={props.useContext}
          />

        </div>
      }

    </Grid>
  )
  
} catch (e) {
  console.error(e);
}
}



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------
