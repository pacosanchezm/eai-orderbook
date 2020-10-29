import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Checkbox } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
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
  const [Registros, setRegistros] = props.useContext.Registros
  const {useAcciones} = props
  const [OpenModal, setOpenModal] = props.useContext.Modal.Open
  const [DetalleExtras, setDetalleExtras] = props.useContext.DetalleExtras

// -----------------------------------------------------------------------------


const Listado = props => {
  let Micolor = "#DCDCDC";
  const Estilo = useThemeUI().theme.styles;

  const ListaCategorias = () => {

    const Renglones = (Cat) => {
      return DetalleExtras.filter(v => v.Titulo === Cat).map((row, i) => (
        <Renglon 
          key={row.ExtrasDetId}
          row={row}
          i={i}
          ExtrasDet={DetalleExtras}
          setExtrasDet={setDetalleExtras}
          //setEditado={props.setEditado}
          //usedata={props.usedata}

        />
      ))
    }

    const Grupos = DetalleExtras.map((row, i) => {
      return (
      <div>


        <Flex>
          {/* <Text sx={Estilo.t2}>{row.ExtrasTitulo}: $ {props.usedata.Extras().sum}</Text> */}
        </Flex>  



        <Flex>
          <Box sx={{ width: "100%" }}>{Renglones(row.Titulo)}</Box>
        </Flex>  
      </div>
      );
    });

    return (
      <Flex>
        {/* <Box sx={{ width: "100%" }}>{Grupos}</Box> */}

        <Box sx={{ width: "100%" }}>{Renglones("Ingredientes Extra")}</Box>


      </Flex>
      );
  };

  return (
    <Flex>
      
      <Box sx={{ width: "100%" }}>{ListaCategorias()}</Box>
    </Flex>
  );
};

// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { row, Color, setPedido, navigate, setTipoAnim, i } = props;



  const [Cantidad, setCantidad] = useState(props.row.ExtrasDetCantidad);

  const ClickExtra = (x) => {
    props.setExtrasDet(props.ExtrasDet.map((item, i) => {
      if (i===x) {return {...item, "ExtrasDetCantidad": item.ExtrasDetCantidad===1 ? 0 : 1}} 
      else {return item}
    }))
   // props.setEditado(true)
  };

  return (
    <Flex pl={3} sx={{ width: "100%", bg: Color }}>
      <Button
        sx={{
          width: "100%",
          bg: "transparent"
        }}
        onClick={() => ClickExtra(i)}
              
      >
        <Flex sx={{ width: "80%", bg: Color }}>

          <Box sx={{ width: "50%", mr: 2 }}>
            <Text pt={"3px"} sx={Estilo.d2s}>{row.ExtrasDetTitulo}</Text>
          </Box>

          <Box sx={{ width: "20%" }}>
            <Text pt={"3px"} sx={Estilo.d2s}>{row.ExtrasDetPrecio}</Text>
          </Box>

          <Box sx={{ width: "20%" }}>
            <Checkbox 
              //  sx={Estilo.h2}
              checked={row.ExtrasDetCantidad}
            />

          </Box>

        </Flex>
      </Button>
    </Flex>
  );
};

// -----------------------------------------------------------------------------


  try {
    return (
      <Grid sx={{p:0, m: 0}}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            <Listado {...props}/>
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
