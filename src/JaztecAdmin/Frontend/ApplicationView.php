<?php

namespace JaztecAdmin\Frontend;

use JaztecAdmin\Frontend\Component;
use KJSencha\Frontend\Expr;

/**
 * Main application view
 *
 * @author Jasper van Herpt
 */
class ApplicationView extends Component
{

    /**
     * @var array
     */
    protected $attributes = array();

    public function __construct()
    {
        $this->attributes = array(
//            'extend'      => 'Ext.panel.Panel',
            'extend'      => 'Ext.ux.desktop.Desktop',
            'layout'      => 'fit',
            'bodyCls'     => 'desktop',
            'id'          => 'app-main-panel',
            'alias'       => 'widget.appMain',
//            'dockedItems' => array(
//                array(
//                    'xtype'    => 'toolbar',
//                    'dock'     => 'bottom',
//                    'defaults' => array(
//                        'scale'        => 'large',
//                        'enableToggle' => true,
//                        'rowspan'      => 3,
//                        'width'        => 80,
//                        'iconAlign'    => 'left'
//                    ),
//                    'items'    => array(
//                        array(
//                            'xtype'   => 'button',
//                            'text'    => '<strong>Launch</strong>',
//                            'iconCls' => 'icon-engage',
//                            'width'   => 125,
//                            'handler' => new Expr("
//                                // This function is only designed call the launcher menu.
//                                function(button) 
//                                {
//                                    JaztecAdminApp.getApplication().showLaunchMenu(button, JaztecAdminApp)
//                                }
//                            "),
//                        ),
//                        new Expr("'->'"),
//                        new Expr("'|'"),
//                        array(
//                            'xtype' => 'tbtext',
//                            'id'    => 'taskbar-text',
//                            'text'  => 'Initialized'
//                        ),
//                    ),
//                ),
//            ),
        );
    }

}

