import React from "react";
import {
  Table,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  DropdownItem
} from "reactstrap";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import Notimodal from "./notimodal";

class Notification extends React.Component {
  state = {
    unRead: 0
  };

  componentWillMount() {
    let newNoti = 0;
    this.props.auth.patient.notifications.forEach((notification) =>
      notification.isRead === false ? (newNoti = newNoti + 1) : newNoti
    );
    this.setState({ unRead: newNoti });
  }
  render() {
    const { notifications } = this.props.auth.patient;
    return (
      <div>
        <DropdownToggle className="allign" nav>
          <Badge badgeContent={this.state.unRead} color="secondary">
            <NotificationsIcon />
          </Badge>
        </DropdownToggle>
        <DropdownMenu className="notifdrop" style={{ paddingTop: "0px" }} right>
          <Table>
            <thead>
              <tr>
                <th>
                  <h2 className="dataDesign">
                    <b>Notifications</b>
                  </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={notification._id}>
                  <td
                    style={{
                      backgroundColor: !this.props.auth.patient.notifications[
                        index
                      ].isRead
                        ? "gainsboro"
                        : null
                    }}
                  >
                    <Notimodal
                      key={notification._id}
                      notification={notification}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </DropdownMenu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Notification);
