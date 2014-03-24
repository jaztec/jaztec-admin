<?php

namespace JaztecAdminTest\Direct;

use JaztecAdminTest\Bootstrap;
use JaztecAdmin\Direct\Framework;
use PHPUnit_Framework_TestCase;

/**
 * Testcases for the \JaztecAdmin\Direct\Framework object.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
class FrameworkTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var \JaztecAdmin\Direct\Framework
     */
    protected $directObject;

    /**
     * Setup the testcase.
     */
    protected function setUp()
    {
        \Zend\Console\Console::overrideIsConsole(false);
        // Setup the vairables.
        $this->directObject = new Framework();
        $this->directObject->setServiceLocator(Bootstrap::getServiceManager());
    }

    /**
     * Test if the controllers get loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getControllers
     */
    public function testGetControllers()
    {
        $this->assertTrue(is_array($this->directObject->getControllers(array())));
    }

    /**
     * Test if the views are loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getViews
     */
    public function testGetViews()
    {
        $this->assertTrue(is_array($this->directObject->getViews(array('controller' => 'Test.controllers.Test'))));
    }

    /**
     * Test if the views are loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getViews
     */
    public function testGetStores()
    {
        $this->assertTrue(is_array($this->directObject->getStores(array('controller' => 'Test.controllers.Test'))));
    }

    /**
     * {@inheritDoc}
     */
    public function getConnection()
    {
        // Get an instance of your entity manager
        $entityManager = $this->getEntityManager();

        // Retrieve PDO instance
        $pdo = $entityManager->getConnection()->getWrappedConnection();

        // Clear Doctrine to be safe
        $entityManager->clear();

        // Schema Tool to process our entities
        $tool = new \Doctrine\ORM\Tools\SchemaTool($entityManager);
        $classes = $entityManager->getMetaDataFactory()->getAllMetaData();

        // Drop all classes and re-build them for each test case
        $tool->dropSchema($classes);
        $tool->createSchema($classes);

        // Pass to PHPUnit
        return $this->createDefaultDBConnection($pdo, 'db_name');
    }
}