import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import moment from "moment";


/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Textarea, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Extended: useState(useContext(createContext(false))),
    Editado: useState(useContext(createContext(false))),

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
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [Extend, setExtend] = props.useContext.Extend.Cliente
  const [Editado, setEditado] = useContext(StateContext).Editado

  const [PedidoData, setPedidoData] = props.useContext.PedidoData
  const Images = props.useContext.Images


// ----------------------------------

const ModuloSlim  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Cliente:  
                {" " + PedidoData.Nombre + " " + PedidoData.Apellido} 
              </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(true)
                }}
              >
                <Image src={Images.Flechad[0].src} />
              </Button>
            </Box>
          </Flex>

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------


const ModuloSimple  = () => {
 // console.log({Images})
  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%", mb:2 }}>
              <Text sx={Estilo.d1sb}>Cliente: </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(false)
                }}
              >
                <Image  src={Images.Flechau[0].src} />
              </Button>
            </Box>
          </Flex>



          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3, ml: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.d1sb}>Telefono: </Text>
            </Box>
            <Box sx={{ width: "54%" }}>
              <Input {...props.useAcciones.useChangeArray(PedidoData, "Telefono", setPedidoData, setEditado)} />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                width={1}
                bg={"slategrey"}
                Disabled={false}
                onClick={() => {
                  // Clientes.pull(props)
                }}
              >
                Buscar
              </Button>
            </Box>



          </Flex>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3, ml: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.d1sb}>Nombre: </Text>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Input {...props.useAcciones.useChangeArray(PedidoData, "Nombre", setPedidoData, setEditado)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3, ml: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.d1sb}>Apellidos: </Text>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Input {...props.useAcciones.useChangeArray(PedidoData, "Apellido", setPedidoData, setEditado)} />
            </Box>
          </Flex>




          <Flex sx={{ width: "100%", alignItems: "center" }}>
          <Box sx={{ width: "20%" }}/>

            <Button
              sx={{ height: "34px", mb: 3, width: "70%" }}
              bg={Editado ? "#A52A2A":"gray"}
              Disabled={false}
              onClick={ async () => {
                // await setShare(!Share)
                // if(!Share) {props.useAcciones.addPosition()}

                setEditado(false)

              }}
            >
              {Editado ? "Guardar": "Guardado"}
            </Button>
          </Flex>

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
            {(props.useStatus.cliente()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.cliente()===1 & !Extend) ? ModuloSlim() : <div/>}
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
