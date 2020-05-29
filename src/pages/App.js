import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { update_utms } from "../actions/utmsAction";
import { setGeo } from "../actions/geoAction";
import Header from "../components/mainComponents/MainHeader";
import Footer from "../components/mainComponents/footer";
import DefaultThankyouPage from "../components/DefaultThankyouPage";
import ConsultationPopup from "../components/ConsultationPopup";
import ScrollToTop from "../components/scrollToTop";
import Loading from "../components/Loading";
import { GiConsoleController } from "react-icons/gi";
import Geocode from "react-geocode";

class DynamicImport extends Component {
  state = { component: null };
  UNSAFE_componentWillMount() {
    this.props.load().then((component) => {
      this.setState(() => ({
        component: component.default ? component.default : component,
      }));
    });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const MainPage = (props) => {
  return (
    <DynamicImport load={() => import("./MainPage")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Faq = (props) => {
  return (
    <DynamicImport load={() => import("./Faq")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const AboutUs = (props) => {
  return (
    <DynamicImport load={() => import("./AboutUs")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Contacts = (props) => {
  return (
    <DynamicImport load={() => import("./Contacts")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Calculator = (props) => {
  return (
    <DynamicImport load={() => import("./Calculator")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const MainCalculator = (props) => {
  return (
    <DynamicImport load={() => import("./MainCalculator")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const ForBusiness = (props) => {
  return (
    <DynamicImport load={() => import("./ForBusiness")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Admin = (props) => {
  return (
    <DynamicImport load={() => import("./Admin")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Policy = (props) => {
  return (
    <DynamicImport load={() => import("../components/Policy")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const ProcessingRules = (props) => {
  return (
    <DynamicImport load={() => import("../components/ProcessingRules")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Posts = (props) => {
  return (
    <DynamicImport load={() => import("./Posts")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const Consultation = (props) => {
  return (
    <DynamicImport load={() => import("./Consultation")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};
const NotFound = (props) => {
  return (
    <DynamicImport load={() => import("./404")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  componentDidMount() {
    let utms = this.getUtms();
    const path = window.location.pathname.slice(0, 6);
    path === "/admin" && this.setState({ isAdmin: true });
    let location = 0;
    if (utms.utm_campaign && utms.utm_campaign.match(/mogilev/gim))
      location = 1;
    this.props.updateUtms({ ...utms, location });
    // axios.get('http://ip-api.com/json/?lang=ru')
    //     .then(response => response.data)
    //     .then(data => {
    //         this.props.setGeoToStore(data);
    //         let location = 0;
    //         if (utms.utm_campaign && utms.utm_campaign.match(/mogilev/gim)) location = 1;
    //         if (Object.keys(data).length && data.regionName.match(/Могилев/gim)) location = 1;
    //         utms = {...utms, location};
    //         this.props.updateUtms(utms);
    //     })
    //     .catch(() => {
    //         let location = 0;
    //         if (utms.utm_campaign && utms.utm_campaign.match(/mogilev/gim)) location = 1;
    //         this.props.updateUtms({...utms, location});
    //     });

    // window.addEventListener("click", function (event) {
    //     const apiKey = 'AIzaSyBr7lLAWRHqjUi3R233HP-A9-H4idLomEg';
    //   if (!navigator.geolocation) {
    //    console.log("Geolocation is not supported by your browser");
    //   } else {
  
    //     navigator.geolocation.getCurrentPosition(success);
    //   }
    //   function success(position) {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     Geocode.setApiKey(apiKey);
    //     Geocode.fromLatLng(latitude, longitude).then(
    //         response => {
    //           const address = response.results[0].formatted_address;
    //           console.log(address);
    //         },
    //         error => {
    //           console.error(error);
    //         }
    //       );

    //     console.log(latitude, longitude);
    //   }
    // });
  }

  getUtms() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const utm_term = params.get("utm_term");
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_content = params.get("utm_content");
    const superseller = params.get("superseller");
    return {
      utm_term,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      superseller,
    };
  }
  render() {
    return (
      <Router>
        {!this.state.isAdmin && <Header />}
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/faq" component={Faq} />
          <Route path="/about" component={AboutUs} />
          <Route path="/contacts" component={Contacts} />
          <Route exact path="/calculator" component={Calculator} />
          <Route path="/calculator/:name" component={Calculator} />
          <Route path="/for-business/:pageType" component={ForBusiness} />
          <Route path="/admin" component={Admin} />
          <Route path="/policy" component={Policy} />
          <Route path="/rules" component={ProcessingRules} />
          <Route path="/posts/:postId" component={Posts} />
          <Route path="/consultation" component={Consultation} />
          <Route component={NotFound} />
        </Switch>
        {!this.state.isAdmin && <Footer />}
        <ConsultationPopup />
        <DefaultThankyouPage />
      </Router>
    );
  }
}

export default connect(
  (state) => ({ utms: state.utmsReducer }),
  (dispatch) => ({
    updateUtms: (obj) => dispatch(update_utms(obj)),
    setGeoToStore: (obj) => dispatch(setGeo(obj)),
  })
)(App);
