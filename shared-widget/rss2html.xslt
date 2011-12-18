<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">

<xsl:template match="/">

  <h2>My public feed</h2>

  <div><xsl:value-of select="feed/title" /></div>

  <!-- TODO: limit number of entries (configurable?) -->
  <xsl:for-each select="atom:feed/atom:entry">
    <div class='tt-entry'>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:value-of select="atom:link/@href" />
        </xsl:attribute>
        <xsl:value-of select="atom:title" />
      </xsl:element>
    </div>
  </xsl:for-each>
</xsl:template>

</xsl:stylesheet>
