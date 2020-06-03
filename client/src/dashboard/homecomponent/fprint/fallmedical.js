import React, { Fragment } from "react";
import Fpersonalrecord from "./fpersonalrecord";
import Fmedicalhistory from "./fmedicalhistory";
import Fmedicalrecords from "./fmedicalrecord";

class FAllmedical extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="paging">
          <Fpersonalrecord
            id={this.props.id}
            today={this.props.today}
            firstName={this.props.firstName}
            middleName={this.props.middleName}
            lastName={this.props.lastName}
            sex={this.props.sex}
            age={this.props.age}
            birthdate={this.props.birthdate}
            civilStatus={this.props.civilStatus}
            nationality={this.props.nationality}
            religion={this.props.religion}
            contactNumber={this.props.contactNumber}
            guardianName={this.props.guardianName}
            relationship={this.props.relationship}
            guardianContactNo={this.props.guardianContactNo}
          />
          {!this.props.isHistory ? (
            <Fmedicalhistory
              id={this.props.id}
              today={this.props.today}
              firstName={this.props.firstName}
              middleName={this.props.middleName}
              lastName={this.props.lastName}
              pastIllness={this.props.pastIllness}
              famIllness={this.props.famIllness}
              height={this.props.height}
              weight={this.props.weight}
              bloodType={this.props.bloodType}
              immunization={this.props.immunization}
              bodyArt={this.props.bodyArt}
              habits={this.props.habits}
              visualAcuity={this.props.visualAcuity}
              menarchYear={this.props.menarchYear}
              menarchAge={this.props.menarchAge}
              mensDuration={this.props.mensDuration}
              dysmennorrhea={this.props.dysmennorrhea}
              sex={this.props.sex}
            />
          ) : null}
          <Fmedicalrecords records={this.props.records} />
        </div>
      </Fragment>
    );
  }
}
export default FAllmedical;
