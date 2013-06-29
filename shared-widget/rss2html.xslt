<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">

<xsl:output method="html"/>

<xsl:param name="max_rows"/>
<xsl:param name="ttrss_feed_url"/>


<xsl:template match="/">
  <div id="tt-title">
    <a id="tt-title-link">
        <xsl:attribute name="href">
            <xsl:value-of select="$ttrss_feed_url"/>
        </xsl:attribute>
        My shared articles
    </a>
  </div>

  <div><xsl:value-of select="feed/title" /></div>

  <xsl:for-each select="atom:feed/atom:entry">
    <xsl:if test="position() &lt;= $max_rows">
        <xsl:variable name="oddeven-class">
          <xsl:choose>
            <xsl:when test="position() mod 2 = 0">tt-even</xsl:when>
            <xsl:otherwise>tt-odd</xsl:otherwise>
          </xsl:choose>
        </xsl:variable>
        <xsl:variable name="last-index">
          <xsl:choose>
            <xsl:when test="$max_rows &gt; last()"><xsl:value-of select="last()"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$max_rows"/></xsl:otherwise>
          </xsl:choose>
        </xsl:variable>
        <xsl:variable name="firstlast-class">
          <xsl:choose>
            <xsl:when test="position() = 1">tt-first</xsl:when>
            <xsl:when test="position() = $last-index">tt-last</xsl:when>
            <xsl:otherwise></xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <div>
          <xsl:attribute name="class">
            tt-entry
            <xsl:value-of select="$oddeven-class"/><xsl:text> </xsl:text>
            <xsl:value-of select="$firstlast-class"/>
          </xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="atom:link/@href" />
            </xsl:attribute>
            <xsl:value-of select="atom:title" />
          </xsl:element>
        </div>
    </xsl:if>
  </xsl:for-each>
</xsl:template>

</xsl:stylesheet>
