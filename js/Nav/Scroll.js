import React from 'react';
import {animateScroll as scroll, Events, Link, scroller} from 'react-scroll'

class Scroll extends React.Component {

    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (

                <div className='container4'>
                        <ul className="row4">
                            <li className="navItem "><Link activeClass="active" className="test1 link" to="test1" spy={true}
                                                          smooth={true}
                                                          duration={500}>USD więcej...</Link></li>
                            <li className="navItem"><Link activeClass="active" className="test2 link" to="test2" spy={true}
                                                          smooth={true}
                                                          duration={500}>CHF więcej...</Link></li>
                            <li className="navItem"><Link activeClass="active" className="test3 link" to="test3" spy={true}
                                                          smooth={true}
                                                          duration={500}>EUR więcej...</Link></li>
                        </ul>
                </div>
        );
    }
};
export default Scroll;