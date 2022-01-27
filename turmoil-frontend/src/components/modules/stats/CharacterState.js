import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ReduxActions from '../../../js/redux/actions';
import WindowStats from '../../../js/windows/window-stats';

const mapStateToProps = (state) => ({ characterState: state.characterState });

function mapDispatchToProps(dispatch) {
  return {
    updateCharacterStats: (characterState) => dispatch(ReduxActions.updateCharacterStatsAction(characterState)),
  };
}

class ConnectedCharacterState extends React.Component {
  componentDidMount() {
    const { updateCharacterStats } = this.props;
    WindowStats.updateStats(updateCharacterStats);
  }

  render() {
    const { characterState } = this.props;

    return (
      <table className="statsTable" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.level" />
            </td>
            <td className="statsValue">{characterState.level}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.experience" />
              {' '}
              (TODO: out of and %)
            </td>
            <td className="statsValue">{characterState.experience}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.stat.strength" />
            </td>
            <td className="statsValue">{characterState.statStrength}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.stat.dexterity" />
            </td>
            <td className="statsValue">{characterState.statDexterity}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.stat.intelligence" />
            </td>
            <td className="statsValue">{characterState.statIntelligence}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.stat.vitality" />
            </td>
            <td className="statsValue">{characterState.statVitality}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.health" />
            </td>
            <td className="statsValue">{characterState.health}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.mana" />
            </td>
            <td className="statsValue">{characterState.mana}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.average.damage" />
            </td>
            <td className="statsValue">{characterState.damageAvg}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.crit.chance" />
            </td>
            <td className="statsValue">
              {characterState.critChance}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.crit.damage" />
            </td>
            <td className="statsValue">
              {characterState.critDamage}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.armor" />
            </td>
            <td className="statsValue">{characterState.armor}</td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.block" />
            </td>
            <td className="statsValue">
              {characterState.evasionBlock}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.dodge" />
            </td>
            <td className="statsValue">
              {characterState.evasionDodge}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.parry" />
            </td>
            <td className="statsValue">
              {characterState.evasionParry}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.fire" />
            </td>
            <td className="statsValue">
              {characterState.resistFire}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.cold" />
            </td>
            <td className="statsValue">
              {characterState.resistCold}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.lightning" />
            </td>
            <td className="statsValue">
              {characterState.resistLightning}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.poison" />
            </td>
            <td className="statsValue">
              {characterState.resistPoison}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.arcane" />
            </td>
            <td className="statsValue">
              {characterState.resistArcane}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.bleed" />
            </td>
            <td className="statsValue">
              {characterState.resistBleed}
              {' '}
              %
            </td>
          </tr>
          <tr>
            <td className="statsLabel">
              <FormattedMessage id="turmoil.stats.label.resist.piercing" />
            </td>
            <td className="statsValue">
              {characterState.resistPiercing}
              {' '}
              %
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const CharacterState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedCharacterState);

export default CharacterState;
