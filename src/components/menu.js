import React from "react"
import { Link } from 'gatsby'
import PropTypes from 'prop-types'


const MainMenu = ({menus}) => {
  console.log(menus)

  return (
    <div>
      <ul>
      {
        menus.items.map((menu) => (
          <li key={menu.wordpress_id}>
            <Link to={menu.url} activeClassName="active" activeStyle={{ color: 'red' }}>{menu.title}</Link>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

MainMenu.propTypes = {
  menus: PropTypes.object.isRequired,
}

export default MainMenu
