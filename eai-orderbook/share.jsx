import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

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
  const [Extend, setExtend] = props.useContext.Extend.Share
  const [Editado, setEditado] = useContext(StateContext).Editado
  const [PedidoData, setPedidoData] = props.useContext.PedidoData
  const Images = props.useContext.Images
  const [Server] = props.useContext.Server

// ----------------------------------


const LinkPay = Server + "/pay?id=" + PedidoData.Codigo
//const LinkOrder = Server + "/order?id=" + PedidoData.Codigo
const LinkOrder = Server + "/order?id=" + PedidoData.Codigo



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
              <Text sx={Estilo.d1sb}>Compartir:
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
              <Text sx={Estilo.d1sb}>Compartir: </Text>
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



          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "70%" }}>
              <Text sx={Estilo.h2}>Solo Pago:</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "70%" }}>
              <Input
                sx={{ fontSize: "1" }}
                name="Link"
                value={ LinkPay }
                fontSize={1}
              />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                sx={{ fontSize: "1" }}
                bg={"slategrey"}
                Disabled={false}
                onClick={async () => { await navigator.clipboard.writeText(LinkPay) }}
              >
                Copiar
              </Button>
            </Box>

            <Box sx={{ width: "15%" }}>

              <Button
                sx={{
                  fontSize: "2"
                }}
                width={1}
                bg={"orange"}
                Disabled={false}
                onClick={async () => {
                  let Send = await props.useAcciones.sendSms();
                  if (Send === 1) {console.log("Sms Mandado")}
                }}
              >
                SMS
              </Button>

            </Box>

          </Flex>





          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "70%" }}>
              <Text sx={Estilo.h2}>Ordenar:</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "70%" }}>
              <Input
                sx={{ fontSize: "1" }}
                name="Link"
                value={ LinkOrder }
                fontSize={1}
              />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                sx={{ fontSize: "1" }}
                bg={"slategrey"}
                Disabled={false}
                onClick={async () => { await navigator.clipboard.writeText(LinkOrder) }}
              >
                Copiar
              </Button>
            </Box>

            <Box sx={{ width: "15%" }}>

              <Button
                sx={{
                  fontSize: "2"
                }}
                width={1}
                bg={"orange"}
                Disabled={false}
                onClick={async () => {
                  let Send = await props.useAcciones.sendSms2();
                  if (Send === 1) {console.log("Sms Mandado")}
                }}
              >
                SMS
              </Button>

            </Box>

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
            {(props.useStatus.share()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.share()===1 & !Extend) ? ModuloSlim() : <div/>}
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
