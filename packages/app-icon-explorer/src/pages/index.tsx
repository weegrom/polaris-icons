import React from 'react';
import {graphql} from 'gatsby';
import {Icon, AppProvider} from '@shopify/polaris';

import Layout from '../components/layout';
import Seo from '../components/seo';
import IconPanel from '../components/icon-panel';
import {Icon as IconInterface} from '../types';

import styles from './index.module.scss';

interface Props {
  data: {
    allPolarisYaml: {
      edges: {
        node: IconInterface;
      }[];
    };
  };
}

interface State {
  currentIcon?: IconInterface;
}

export default class IndexPage extends React.Component<Props, State> {
  state: State = {
    currentIcon: undefined,
  };

  render() {
    const {allPolarisYaml} = this.props.data;

    const SideBar = () => {
      return this.state.currentIcon ? (
        <IconPanel icon={this.state.currentIcon} />
      ) : (
        <div>Choose an icon to begin</div>
      );
    };

    return (
      <AppProvider>
        <Layout>
          <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
          <div className={styles.IconGrid}>
            {allPolarisYaml.edges.map(({node: icon}) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={icon.id}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => this.setState({currentIcon: icon})}
                className={styles.IconGridItem}
              >
                <Icon
                  source={<div dangerouslySetInnerHTML={{__html: icon.svg}} />}
                />
                <div>{icon.name}</div>
              </div>
            ))}
          </div>
          <SideBar />
        </Layout>
      </AppProvider>
    );
  }
}

export const pageQuery = graphql`
  query {
    allPolarisYaml {
      edges {
        node {
          date_added
          date_modified
          name
          id
          set
          descriptionHtml
          basename
          public
          keywords
          authors
          svg
        }
      }
    }
  }
`;
