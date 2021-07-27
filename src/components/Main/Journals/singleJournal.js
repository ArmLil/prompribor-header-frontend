import Gerb from "./gerb-min-ob.png";
const styles = {
  root: {
    height: "400px",
    width: "300px",
    backgroundColor: "white",
  },
  bordersTopBottom: {
    position: "relative",
    top: -2,
    left: 18,
    height: "400px",
    width: "262px",
    borderTop: "3px solid black",
    borderBottom: "3px solid black",
  },
  bordersLeftRight: {
    position: "absolute",
    top: 14,
    left: -20,
    height: "364px",
    width: "300px",
    borderLeft: "3px solid black",
    borderRight: "3px solid black",
  },
  child: {
    position: "absolute",
    top: 5,
    left: -12,
    height: "385px",
    width: "285px",
    border: "2px solid #676672",
    borderRadius: "10px",
    // backgroundColor: "yellow",
    backgroundColor: "white",
  },
  cornerLeftTop: {
    position: "absolute",
    top: -3,
    left: -17,
    height: "20px",
    width: "20px",
    borderBottom: "3px solid black",
    borderRight: "3px solid black",
  },
  cornerRightTop: {
    position: "absolute",
    top: -3,
    right: -17,
    height: "20px",
    width: "20px",
    borderLeft: "3px solid black",
    borderBottom: "3px solid black",
  },
  cornerLeftBottom: {
    position: "absolute",
    bottom: -1,
    left: -17,
    height: "20px",
    width: "20px",
    borderTop: "3px solid black",
    borderRight: "3px solid black",
  },
  cornerRightBottom: {
    position: "absolute",
    bottom: -1,
    right: -17,
    height: "20px",
    width: "20px",
    borderTop: "3px solid black",
    borderLeft: "3px solid black",
  },
  gerb: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    height: "110px",
    width: "110px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  topTitle: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    color: "black",
    fontSize: "12px",
    fontWeight: "bold",
  },
  subTitle: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
  },
  text: {
    position: "absolute",
    top: 220,
    left: 0,
    right: 0,
    color: "black",
    fontSize: "70%",
    fontWeight: "bold",
    whiteSpace: "initial",
  },
  footerText1: {
    position: "absolute",
    bottom: 30,
    right: 10,
    color: "black",
    fontSize: "12px",
  },
  footerText2: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "black",
    fontSize: "12px",
  },
  table: {
    position: "relative",
    bottom: 10,
    right: 10,
  },
};

export default function SingleJournal({ alt, name }) {
  // <div style={styles.child}></div>

  return (
    <div alt={alt} name={name} style={styles.root} id={alt}>
      <div style={styles.bordersTopBottom}>
        <div style={styles.child}>
          <h6 style={styles.topTitle}>ЗАПАДНЫЙ ВОЕННЫЙ ОКРУГ</h6>
          <div style={styles.gerb}>
            <img src={Gerb} alt="" />
          </div>
          <h6 style={styles.subTitle}>ЖУРНАЛ</h6>
          <p style={styles.text}>{name}</p>
          <p style={styles.footerText1}>Начат &nbsp;"___"______20__</p>
          <p style={styles.footerText2}>Окончен &nbsp;"___"______20__</p>
        </div>
        <div style={styles.bordersLeftRight}></div>
        <div style={styles.cornerLeftTop}></div>
        <div style={styles.cornerRightTop}></div>
        <div style={styles.cornerLeftBottom}></div>
        <div style={styles.cornerRightBottom}></div>
      </div>
    </div>
  );
}
