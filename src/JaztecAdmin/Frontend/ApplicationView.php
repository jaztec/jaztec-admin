<?php

namespace JaztecAdmin\Frontend;

use JaztecAdmin\Frontend\Component;
use KJSencha\Frontend\Expr;

/**
 * Main application view
 *
 * @author Jasper van Herpt
 */
class ApplicationView extends Component {

    /**
     * @var array
     */
    protected $attributes = array();

    public function __construct() {
        $this->attributes = array(
            'extend'        => 'Ext.panel.Panel',
            'layout'        => 'card',
            'alias'         => 'widget.appMain',
            'items'         => array(
                array(
                    'xtype'  => 'panel',
                    'title'  => 'We zitten erin',
                    'region' => 'center',
                    'items'  => array(),
                ),
            ),
        );
    }

}

