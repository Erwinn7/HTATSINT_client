import {  Container, Row,Col} from "reactstrap";

const Header = ({menuTitle}) => {

  const titreStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: 'black',
    textAlign: 'center',
    padding: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    borderRadius: '10px',
    display: 'inline-block',
    marginLeft: '30px', 
    marginRight: '30px',
  };


  return (
    <>
      <div className="pb-2 pt-2"  > 
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center">
            <h1 style={titreStyle}>{menuTitle}</h1>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default Header;
